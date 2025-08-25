import { Router, Request, Response } from 'express';
import { GoogleSheetsService } from '../services/googleSheets';
import { MetricsResponse } from '../../shared/types/metrics';
import { getMockMetrics } from '../services/mockData';

const router = Router();
const googleSheetsService = new GoogleSheetsService();

/**
 * GET /api/metrics
 * Obtiene métricas de ocupación de nodos desde Google Sheets
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    console.log('Metrics endpoint called');
    
    const metrics = await googleSheetsService.getMetrics();
    
    const response: MetricsResponse = {
      success: true,
      data: metrics,
      timestamp: new Date().toISOString()
    };

    res.json(response);

  } catch (error) {
    console.error('Error in metrics endpoint:', error);
    
    const errorResponse: MetricsResponse = {
      success: false,
      data: [],
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };

    res.status(500).json(errorResponse);
  }
});

/**
 * GET /api/metrics/health
 * Endpoint de salud para verificar conexión con Google Sheets
 */
router.get('/health', async (req: Request, res: Response) => {
  try {
    const metrics = await googleSheetsService.getMetrics();
    
    res.json({
      status: 'OK',
      message: 'Google Sheets connection working',
      metricsCount: metrics.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: 'Google Sheets connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/metrics/test
 * Endpoint de testing con datos simulados
 */
router.get('/test', async (req: Request, res: Response) => {
  try {
    const mockData = getMockMetrics();
    
    const response: MetricsResponse = {
      success: true,
      data: mockData,
      timestamp: new Date().toISOString()
    };

    res.json(response);

  } catch (error) {
    const errorResponse: MetricsResponse = {
      success: false,
      data: [],
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };

    res.status(500).json(errorResponse);
  }
});

export default router;
