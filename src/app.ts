import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { errorHandler, notFoundHandler } from './shared/middleware/error';

// Import modules
import { getWebhooksRouter } from './modules/webhooks/webhooks.module';
import { getTeamsRouter } from './modules/teams/teams.module';
import { getMatchesRouter } from './modules/matches/matches.module';
import { getSeasonsRouter } from './modules/seasons/seasons.module';
import { getPlayersRouter } from './modules/players/players.module';
import { getSportsRouter } from './modules/sports/sports.module';

/**
 * Create and configure the Express application
 */
export const createApp = (): Application => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Health check endpoint
  app.get('/', (req, res) => {
    res.json({
      status: 'ok',
      message: 'Acity Sports API',
      version: '2.0.0',
      timestamp: new Date().toISOString()
    });
  });

  // API Routes
  app.use('/api/v1/webhooks', getWebhooksRouter());
  app.use('/api/v1/teams', getTeamsRouter());
  app.use('/api/v1/matches', getMatchesRouter());
  app.use('/api/v1/seasons', getSeasonsRouter());
  app.use('/api/v1/players', getPlayersRouter());
  app.use('/api/v1/sports', getSportsRouter());

  // 404 handler
  app.use(notFoundHandler);

  // Error handling middleware (must be last)
  app.use(errorHandler);

  return app;
};

