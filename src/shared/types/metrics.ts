// Tipos compartidos para métricas de ocupación de nodos

export interface NodeMetric {
  ocupacionNodo: string;
  capacidadReal: number;
  ultimas24Horas: string;
  capacidadEnUso: number;
  porcentajeOcupacion: number;
  colorIndicador: 'green' | 'yellow' | 'red';
}

export interface MetricsResponse {
  success: boolean;
  data: NodeMetric[];
  timestamp: string;
  error?: string;
}

export interface GoogleSheetsRow {
  [key: string]: string | number;
}

// Tipos para configuración de Google Sheets
export interface GoogleSheetsConfig {
  spreadsheetId: string;
  range: string;
  credentials?: any;
}
