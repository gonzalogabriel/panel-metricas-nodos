import React from 'react';
import { NodeMetric } from '../../../shared/types/metrics';

interface MetricCardProps {
  metric: NodeMetric;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const getStatusConfig = (color: string) => {
    switch (color) {
      case 'green':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-700',
          badge: 'bg-green-100 text-green-800',
          icon: 'text-green-600',
          progress: 'bg-green-500'
        };
      case 'yellow':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-700',
          badge: 'bg-yellow-100 text-yellow-800',
          icon: 'text-yellow-600',
          progress: 'bg-yellow-500'
        };
      case 'red':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-700',
          badge: 'bg-red-100 text-red-800',
          icon: 'text-red-600',
          progress: 'bg-red-500'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          text: 'text-gray-700',
          badge: 'bg-gray-100 text-gray-800',
          icon: 'text-gray-600',
          progress: 'bg-gray-500'
        };
    }
  };

  const getStatusText = (color: string) => {
    switch (color) {
      case 'green': return 'Normal';
      case 'yellow': return 'Advertencia';
      case 'red': return 'Crítico';
      default: return 'Desconocido';
    }
  };

  const config = getStatusConfig(metric.colorIndicador);
  const statusText = getStatusText(metric.colorIndicador);

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-4">
      {/* Test Header */}
      <div className="bg-blue-100 rounded-lg p-4 mb-4">
        <h3 className="text-xl font-bold text-blue-900">{metric.ocupacionNodo}</h3>
        <p className="text-blue-700">Estado: {statusText}</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>0%</span>
          <span className="font-bold">{metric.porcentajeOcupacion.toFixed(1)}%</span>
          <span>100%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ease-out ${config.progress}`}
            style={{ width: `${Math.min(metric.porcentajeOcupacion, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-gray-900">
            {metric.capacidadReal.toFixed(1)}
          </div>
          <div className="text-xs text-gray-500">Capacidad Real (GB)</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-gray-900">
            {metric.capacidadEnUso.toFixed(1)}
          </div>
          <div className="text-xs text-gray-500">En Uso (GB)</div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex items-center justify-between">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.badge}`}>
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {statusText}
        </div>
        <div className="text-xs text-gray-500">
          {metric.ultimas24Horas}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
