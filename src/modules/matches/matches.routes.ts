import { Router } from 'express';
import * as matchesController from './matches.controller';

export const matchesRouter = Router();

matchesRouter.get('/', matchesController.getAllMatches);
matchesRouter.get('/:id', matchesController.getMatch);
matchesRouter.post('/', matchesController.createMatch);
matchesRouter.put('/:id', matchesController.updateMatch);
matchesRouter.delete('/:id', matchesController.deleteMatch);

