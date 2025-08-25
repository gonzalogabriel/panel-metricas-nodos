import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

// Configuración para Google Sheets API
export const googleSheetsConfig = {
  spreadsheetId: process.env.GOOGLE_SHEETS_ID || '',
  range: process.env.GOOGLE_SHEETS_RANGE || 'A:D',
  clientId: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  apiKey: process.env.GOOGLE_API_KEY || '',
  credentials: process.env.GOOGLE_CREDENTIALS ? JSON.parse(process.env.GOOGLE_CREDENTIALS) : null
};

// Crear cliente de Google Sheets
export const createGoogleSheetsClient = () => {
  console.log('Creating Google Sheets client...');
  console.log('Config:', {
    hasApiKey: !!googleSheetsConfig.apiKey,
    hasClientId: !!googleSheetsConfig.clientId,
    hasCredentials: !!googleSheetsConfig.credentials,
    spreadsheetId: googleSheetsConfig.spreadsheetId
  });

  if (googleSheetsConfig.apiKey) {
    // Usar API Key para acceso público
    console.log('Using API Key authentication');
    return google.sheets({ 
      version: 'v4',
      auth: googleSheetsConfig.apiKey
    });
  } else if (googleSheetsConfig.credentials) {
    // Usar credenciales de servicio
    console.log('Using Service Account credentials');
    const auth = new google.auth.GoogleAuth({
      credentials: googleSheetsConfig.credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
    });
    
    return google.sheets({ 
      version: 'v4',
      auth 
    });
  } else {
    // Sin autenticación (intentar acceso público)
    console.log('Trying public access without authentication');
    return google.sheets({ version: 'v4' });
  }
};

// Verificar configuración
export const validateGoogleSheetsConfig = () => {
  const errors: string[] = [];
  
  if (!googleSheetsConfig.spreadsheetId) {
    errors.push('GOOGLE_SHEETS_ID no está configurado');
  }
  
  if (!googleSheetsConfig.apiKey && !googleSheetsConfig.credentials && 
      (!googleSheetsConfig.clientId || !googleSheetsConfig.clientSecret)) {
    errors.push('Se requiere GOOGLE_API_KEY, GOOGLE_CREDENTIALS o GOOGLE_CLIENT_ID + GOOGLE_CLIENT_SECRET');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
