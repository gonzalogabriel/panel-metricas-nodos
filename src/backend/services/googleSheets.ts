import { google } from 'googleapis';
import { NodeMetric, GoogleSheetsRow } from '../../shared/types/metrics';
import { createGoogleSheetsClient, validateGoogleSheetsConfig } from '../config/googleSheets';
import { getMockMetrics } from './mockData';

export class GoogleSheetsService {
  private sheets: any;
  private spreadsheetId: string;
  private range: string;

  constructor() {
    this.spreadsheetId = process.env.GOOGLE_SHEETS_ID || '';
    this.range = process.env.GOOGLE_SHEETS_RANGE || 'A:D';

    // Initialize Google Sheets API with proper authentication
    this.sheets = createGoogleSheetsClient();
  }

  async getMetrics(): Promise<NodeMetric[]> {
    try {
      console.log('Fetching data from Google Sheets...');

      // Validar configuración antes de hacer la llamada
      const configValidation = validateGoogleSheetsConfig();
      if (!configValidation.isValid) {
        console.error('Google Sheets configuration errors:', configValidation.errors);
        throw new Error('Configuración de Google Sheets inválida: ' + configValidation.errors.join(', '));
      }

      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: this.range,
      });

      const rows = response.data.values;
      if (!rows || rows.length === 0) {
        console.log('No data found in Google Sheets');
        return [];
      }

      // Skip header row and process data rows
      const dataRows = rows.slice(1).filter((row: any[]) => row.length >= 4);
      
      const metrics: NodeMetric[] = dataRows.map((row: any[]) => {
        const ocupacionNodo = String(row[0] || '');
        const capacidadRealStr = String(row[1] || '0');
        const ultimas24Horas = String(row[2] || '');
        const capacidadEnUsoStr = String(row[3] || '0');
        
        // Parse capacity values (handle comma as decimal separator)
        const capacidadReal = parseFloat(capacidadRealStr.replace(',', '.'));
        const capacidadEnUso = parseFloat(ultimas24Horas.replace(',', '.'));
        
        // Parse percentage from column 4 (remove % sign and handle comma as decimal separator)
        const porcentajeStr = capacidadEnUsoStr.replace('%', '').replace(',', '.');
        const porcentajeOcupacion = parseFloat(porcentajeStr) || 0;
        
        // Determine color indicator based on percentage
        let colorIndicador: 'green' | 'yellow' | 'red';
        if (porcentajeOcupacion <= 75) {
          colorIndicador = 'green';
        } else if (porcentajeOcupacion <= 80) {
          colorIndicador = 'yellow';
        } else {
          colorIndicador = 'red';
        }

        return {
          ocupacionNodo,
          capacidadReal,
          ultimas24Horas,
          capacidadEnUso,
          porcentajeOcupacion: Math.round(porcentajeOcupacion * 100) / 100,
          colorIndicador
        };
      });

      console.log(`Processed ${metrics.length} metrics from Google Sheets`);
      return metrics;

    } catch (error) {
      console.error('Error fetching data from Google Sheets:', error);

      // En desarrollo, usar datos de prueba si Google Sheets falla
      if (process.env.NODE_ENV === 'development') {
        console.log('Using mock data for development...');
        return getMockMetrics();
      }

      throw new Error('Failed to fetch data from Google Sheets');
    }
  }
}
