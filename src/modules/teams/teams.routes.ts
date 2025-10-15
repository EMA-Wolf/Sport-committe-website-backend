import { Router } from 'express';
import * as teamsController from './teams.controller';

export const teamsRouter = Router();

teamsRouter.get('/', teamsController.getAllTeams);
teamsRouter.get('/:id', teamsController.getTeam);
teamsRouter.post('/', teamsController.createTeam);
teamsRouter.put('/:id', teamsController.updateTeam);
teamsRouter.delete('/:id', teamsController.deleteTeam);

