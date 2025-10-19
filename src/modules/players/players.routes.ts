import { Router } from 'express';
import * as playersController from './players.controller';

export const playersRouter = Router();

playersRouter.get('/', playersController.getAllPlayers);
playersRouter.get('/:id', playersController.getPlayer);
playersRouter.post('/', playersController.createPlayer);
playersRouter.put('/:id', playersController.updatePlayer);
playersRouter.delete('/:id', playersController.deletePlayer);

