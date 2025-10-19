import { Router } from 'express';
import * as webhooksController from './webhooks.controller';

export const webhooksRouter = Router();

// Sanity webhook routes
webhooksRouter.post('/sanity', webhooksController.handleSanityCreationOrUpdate);
webhooksRouter.delete('/sanity', webhooksController.handleSanityDeletion);

