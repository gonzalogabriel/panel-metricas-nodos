import { NodeMetric } from '../../shared/types/metrics';

// Datos de prueba para desarrollo y testing
export const mockMetricsData: NodeMetric[] = [
  {
    ocupacionNodo: 'Nodo-001',
    capacidadReal: 1000.0,
    ultimas24Horas: 'Viernes 22 Agosto 11:00',
    capacidadEnUso: 650.0,
    porcentajeOcupacion: 65.0,
    colorIndicador: 'green'
  },
  {
    ocupacionNodo: 'Nodo-002',
    capacidadReal: 800.0,
    ultimas24Horas: 'Viernes 22 Agosto 11:00',
    capacidadEnUso: 620.0,
    porcentajeOcupacion: 77.5,
    colorIndicador: 'yellow'
  },
  {
    ocupacionNodo: 'Nodo-003',
    capacidadReal: 1200.0,
    ultimas24Horas: 'Viernes 22 Agosto 11:00',
    capacidadEnUso: 1100.0,
    porcentajeOcupacion: 91.7,
    colorIndicador: 'red'
  },
  {
    ocupacionNodo: 'Nodo-004',
    capacidadReal: 500.0,
    ultimas24Horas: 'Viernes 22 Agosto 11:00',
    capacidadEnUso: 300.0,
    porcentajeOcupacion: 60.0,
    colorIndicador: 'green'
  },
  {
    ocupacionNodo: 'Nodo-005',
    capacidadReal: 1500.0,
    ultimas24Horas: 'Viernes 22 Agosto 11:00',
    capacidadEnUso: 1200.0,
    porcentajeOcupacion: 80.0,
    colorIndicador: 'yellow'
  },
  {
    ocupacionNodo: 'Nodo-006',
    capacidadReal: 900.0,
    ultimas24Horas: 'Viernes 22 Agosto 11:00',
    capacidadEnUso: 850.0,
    porcentajeOcupacion: 94.4,
    colorIndicador: 'red'
  }
];

export const getMockMetrics = (): NodeMetric[] => {
  // Simular pequeñas variaciones en los datos para hacer el testing más realista
  return mockMetricsData.map(metric => ({
    ...metric,
    capacidadEnUso: metric.capacidadEnUso + (Math.random() * 20 - 10), // ±10 variación
    porcentajeOcupacion: Math.min(100, Math.max(0, metric.porcentajeOcupacion + (Math.random() * 4 - 2))), // ±2% variación
    colorIndicador: getColorIndicator(metric.porcentajeOcupacion + (Math.random() * 4 - 2))
  }));
};

const getColorIndicator = (porcentaje: number): 'green' | 'yellow' | 'red' => {
  if (porcentaje <= 75) return 'green';
  if (porcentaje <= 80) return 'yellow';
  return 'red';
};
