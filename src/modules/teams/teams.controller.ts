import { Request, Response, NextFunction } from 'express';
import { TeamsService } from './teams.service';

const teamsService = new TeamsService();

export const getTeam = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { id } = req.params;
    const team = await teamsService.get(id);
    
    if (!team) {
      return res.status(404).json({ 
        success: false, 
        message: 'Team not found' 
      });
    }

    return res.json({ 
      success: true, 
      data: team 
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTeams = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { sportId, sport } = req.query;
    let teams;
    if (sportId && typeof sportId === 'string') {
      teams = await teamsService.getBySport(sportId);
    } else if (sport && typeof sport === 'string') {
      teams = await teamsService.getBySport(sport);
    } else {
      teams = await teamsService.getAll();
    }
    return res.json({ 
      success: true, 
      data: teams 
    });
  } catch (error) {
    next(error);
  }
};

export const createTeam = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const teamData = req.body;
    const team = await teamsService.create(teamData);
    return res.status(201).json({ 
      success: true, 
      data: team 
    });
  } catch (error) {
    next(error);
  }
};

export const updateTeam = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { id } = req.params;
    const teamData = req.body;
    const team = await teamsService.update(id, teamData);
    return res.json({ 
      success: true, 
      data: team 
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTeam = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { id } = req.params;
    await teamsService.delete(id);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

