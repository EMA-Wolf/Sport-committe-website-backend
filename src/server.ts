import dotenv from 'dotenv';
import { createApp } from './app';

// Load environment variables
dotenv.config();

// Create Express app
const app = createApp();

// Get port from environment or use default
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log('');
  console.log('🚀 ================================ 🚀');
  console.log('   Acity Sports Backend API');
  console.log('🚀 ================================ 🚀');
  console.log('');
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Server running on: http://localhost:${PORT}`);
  console.log(`📡 Webhooks endpoint: http://localhost:${PORT}/api/v1/webhooks/sanity`);
  console.log('');
  console.log('Available endpoints:');
  console.log('  - GET  /api/v1/teams');
  console.log('  - GET  /api/v1/matches');
  console.log('  - GET  /api/v1/seasons');
  console.log('  - GET  /api/v1/players');
  console.log('  - GET  /api/v1/sports');
  console.log('  - POST /api/v1/webhooks/sanity');
  console.log('');
  console.log('Ready to accept requests! 🎉');
  console.log('');
});
