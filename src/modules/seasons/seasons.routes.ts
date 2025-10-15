import { Router } from 'express';
import * as seasonsController from './seasons.controller';

export const seasonsRouter = Router();

seasonsRouter.get('/', seasonsController.getAllSeasons);
seasonsRouter.get('/:id', seasonsController.getSeason);
seasonsRouter.post('/', seasonsController.createSeason);
seasonsRouter.put('/:id', seasonsController.updateSeason);
seasonsRouter.delete('/:id', seasonsController.deleteSeason);

