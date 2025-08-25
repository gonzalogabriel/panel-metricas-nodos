import React from 'react';
import { NodeMetric } from '../../shared/types/metrics';

interface MetricRowProps {
  metric: NodeMetric;
}

export const MetricRow: React.FC<MetricRowProps> = ({ metric }) => {
  const getColorClasses = (color: 'green' | 'yellow' | 'red') => {
    switch (color) {
      case 'green':
        return 'bg-green-soft border-green-200 text-green-800';
      case 'yellow':
        return 'bg-yellow-soft border-yellow-200 text-yellow-800';
      case 'red':
        return 'bg-red-soft border-red-200 text-red-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getStatusText = (color: 'green' | 'yellow' | 'red') => {
    switch (color) {
      case 'green':
        return 'Normal';
      case 'yellow':
        return 'Advertencia';
      case 'red':
        return 'Crítico';
      default:
        return 'Desconocido';
    }
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {metric.ocupacionNodo}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {metric.capacidadReal.toFixed(2)} GB
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {metric.ultimas24Horas}
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium border-l-4 ${getColorClasses(metric.colorIndicador)}`}>
        <div className="flex items-center justify-between">
          <span>{metric.capacidadEnUso.toFixed(2)} GB</span>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white bg-opacity-50">
            {getStatusText(metric.colorIndicador)}
          </span>
        </div>
        <div className="mt-1">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                metric.colorIndicador === 'green' ? 'bg-green-500' :
                metric.colorIndicador === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${Math.min(metric.porcentajeOcupacion, 100)}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-600 mt-1 block">
            {metric.porcentajeOcupacion.toFixed(1)}% ocupado
          </span>
        </div>
      </td>
    </tr>
  );
};
