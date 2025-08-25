import React, { useState, useEffect, useCallback, useRef } from 'react';
import { NodeMetric } from '../../shared/types/metrics';
import { ApiService } from './services/api';

const App: React.FC = () => {
  const [metrics, setMetrics] = useState<NodeMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [nextRefresh, setNextRefresh] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  const fetchMetrics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await ApiService.getMetrics();
      setMetrics(data);
      const now = new Date();
      setLastUpdate(now.toLocaleString('es-ES'));
      
      // Reiniciar countdown a 5 minutos
      setNextRefresh(5 * 60); // 5 minutos en segundos
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      console.error('Error fetching metrics:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Manual refresh function
  const handleManualRefresh = () => {
    // Limpiar intervalos existentes
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }
    
    // Refrescar datos
    fetchMetrics();
    
    // Reiniciar intervalo automático
    intervalRef.current = setInterval(fetchMetrics, 5 * 60 * 1000);
  };

  // Countdown timer
  useEffect(() => {
    if (nextRefresh > 0) {
      countdownRef.current = setInterval(() => {
        setNextRefresh(prev => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    }

    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, [nextRefresh]);

  useEffect(() => {
    // Primera carga
    fetchMetrics();
    
    // Auto-refresh cada 5 minutos
    intervalRef.current = setInterval(fetchMetrics, 5 * 60 * 1000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, [fetchMetrics]);

  // Test component to verify Tailwind is working
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '32px', maxWidth: '384px', width: '100%', margin: '0 16px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              border: '4px solid #e5e7eb', 
              borderTopColor: '#2563eb',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 16px'
            }}></div>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>Cargando...</h3>
            <p style={{ color: '#6b7280' }}>Verificando que los estilos funcionen correctamente</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '32px', maxWidth: '384px', width: '100%', margin: '0 16px', border: '1px solid #fecaca' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              backgroundColor: '#fef2f2', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <svg style={{ width: '32px', height: '32px', color: '#dc2626' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>Error de conexión</h3>
            <p style={{ color: '#6b7280', marginBottom: '16px' }}>{error}</p>
            <button
              onClick={handleManualRefresh}
              style={{ 
                backgroundColor: '#2563eb', 
                color: 'white', 
                padding: '8px 16px', 
                borderRadius: '8px', 
                fontSize: '14px', 
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
        {/* Header */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '12px', 
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', 
          padding: '24px', 
          marginBottom: '32px',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
                Panel de Control - Métricas de Nodos
              </h1>
              <p style={{ color: '#6b7280', marginBottom: '16px' }}>Monitoreo en tiempo real de la ocupación de nodos</p>
              <div style={{ fontSize: '14px', color: '#9ca3af' }}>
                <div>Última actualización: {lastUpdate}</div>
                {nextRefresh > 0 && (
                  <div style={{ marginTop: '4px' }}>
                    Próxima actualización en: {Math.floor(nextRefresh / 60)}:{(nextRefresh % 60).toString().padStart(2, '0')}
                  </div>
                )}
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={handleManualRefresh}
                disabled={loading}
                style={{ 
                  backgroundColor: loading ? '#9ca3af' : '#2563eb', 
                  color: 'white', 
                  padding: '12px 24px', 
                  borderRadius: '8px', 
                  fontSize: '14px', 
                  fontWeight: '500',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  if (!loading) {
                    (e.target as HTMLButtonElement).style.backgroundColor = '#1d4ed8';
                  }
                }}
                onMouseOut={(e) => {
                  if (!loading) {
                    (e.target as HTMLButtonElement).style.backgroundColor = '#2563eb';
                  }
                }}
              >
                <svg style={{ width: '16px', height: '16px', animation: loading ? 'spin 1s linear infinite' : 'none' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {loading ? 'Actualizando...' : 'Actualizar'}
              </button>
              
              <div style={{ 
                backgroundColor: '#f3f4f6', 
                borderRadius: '8px', 
                padding: '12px 16px',
                fontSize: '14px',
                color: '#374151',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{ 
                  width: '8px', 
                  height: '8px', 
                  backgroundColor: '#10b981', 
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite'
                }}></div>
                Auto-actualización: 5 min
              </div>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '24px' 
        }}>
          {metrics.map((metric, index) => (
            <div key={index} style={{ 
              backgroundColor: 'white', 
              borderRadius: '12px', 
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', 
              padding: '24px',
              border: '1px solid #e5e7eb'
            }}>
              {/* Header azul */}
              <div style={{ 
                backgroundColor: '#dbeafe', 
                borderRadius: '8px', 
                padding: '16px', 
                marginBottom: '16px' 
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e40af' }}>
                  {metric.ocupacionNodo}
                </h3>
                <p style={{ color: '#1d4ed8', fontSize: '14px' }}>
                  Estado: {metric.colorIndicador === 'green' ? 'Normal' : 
                          metric.colorIndicador === 'yellow' ? 'Advertencia' : 'Crítico'}
                </p>
              </div>

              {/* Barra de progreso */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  fontSize: '14px', 
                  color: '#6b7280', 
                  marginBottom: '8px' 
                }}>
                  <span>0%</span>
                  <span style={{ fontWeight: 'bold' }}>{metric.porcentajeOcupacion.toFixed(1)}%</span>
                  <span>100%</span>
                </div>
                <div style={{ 
                  width: '100%', 
                  backgroundColor: '#e5e7eb', 
                  borderRadius: '9999px', 
                  height: '12px' 
                }}>
                  <div
                    style={{ 
                      height: '12px', 
                      borderRadius: '9999px', 
                      transition: 'all 0.5s ease-out',
                      backgroundColor: 
                        metric.colorIndicador === 'green' ? '#10b981' :
                        metric.colorIndicador === 'yellow' ? '#f59e0b' : '#ef4444',
                      width: `${Math.min(metric.porcentajeOcupacion, 100)}%`
                    }}
                  ></div>
                </div>
              </div>

              {/* Grid de métricas */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '16px', 
                marginBottom: '16px' 
              }}>
                <div style={{ 
                  backgroundColor: '#f9fafb', 
                  borderRadius: '8px', 
                  padding: '12px', 
                  textAlign: 'center' 
                }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>
                    {metric.capacidadReal.toFixed(1)}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>Capacidad Real (GB)</div>
                </div>
                <div style={{ 
                  backgroundColor: '#f9fafb', 
                  borderRadius: '8px', 
                  padding: '12px', 
                  textAlign: 'center' 
                }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>
                    {metric.capacidadEnUso.toFixed(1)}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>En Uso (GB)</div>
                </div>
              </div>

              <div style={{ fontSize: '12px', color: '#6b7280', textAlign: 'center' }}>
                {metric.ultimas24Horas}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
