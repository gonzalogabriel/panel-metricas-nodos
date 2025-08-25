import { createServer, serverConfig } from './config/server';
import metricsRoutes from './routes/metrics';

const app = createServer();

// API Routes
app.use('/api/metrics', metricsRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Panel de Control de Métricas API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      metrics: '/api/metrics',
      metricsHealth: '/api/metrics/health'
    },
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: serverConfig.nodeEnv === 'development' ? err.message : 'Something went wrong',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'Endpoint not found',
    timestamp: new Date().toISOString()
  });
});

// Start server
const PORT = serverConfig.port;

app.listen(PORT, () => {
  console.log('🚀 Server running on port', PORT);
  console.log('📊 Metrics API available at http://localhost:' + PORT + '/api/metrics');
  console.log('🏥 Health check at http://localhost:' + PORT + '/health');
  console.log('🌍 Environment:', serverConfig.nodeEnv);
});
