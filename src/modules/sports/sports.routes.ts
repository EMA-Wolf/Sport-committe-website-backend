import { Router } from 'express';
import * as sportsController from './sports.controller';

export const sportsRouter = Router();

sportsRouter.get('/', sportsController.getAllSports);
sportsRouter.get('/:id', sportsController.getSport);
sportsRouter.post('/', sportsController.createSport);
sportsRouter.put('/:id', sportsController.updateSport);
sportsRouter.delete('/:id', sportsController.deleteSport);

