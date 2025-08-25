import { MetricsResponse, NodeMetric } from '../../shared/types/metrics';

const API_BASE_URL = '/api';

export class ApiService {
  /**
   * Obtiene métricas de ocupación de nodos desde el backend
   * @returns Promise<NodeMetric[]> Array de métricas
   */
  static async getMetrics(): Promise<NodeMetric[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/metrics`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: MetricsResponse = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Error al obtener métricas');
      }
      
      return data.data;
      
    } catch (error) {
      console.error('Error fetching metrics:', error);
      throw error;
    }
  }

  /**
   * Verifica la salud del backend
   * @returns Promise<boolean> True si el backend está funcionando
   */
  static async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/metrics/health`);
      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}
