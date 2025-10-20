import { Request, Response, NextFunction } from 'express';
import { PlayersService } from './players.service';

const playersService = new PlayersService();

export const getPlayer = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { id } = req.params;
    const player = await playersService.get(id);
    
    if (!player) {
      return res.status(404).json({ 
        success: false, 
        message: 'Player not found' 
      });
    }

    return res.json({ 
      success: true, 
      data: player 
    });
  } catch (error) {
    next(error);
  }
};

export const getAllPlayers = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { teamId, sportId, sport } = req.query;
    
    let players;
    
    // Priority: sportId > sport > teamId > all
    if (sportId && typeof sportId === 'string') {
      players = await playersService.getBySport(sportId);
    } else if (sport && typeof sport === 'string') {
      players = await playersService.getBySport(sport);
    } else if (teamId && typeof teamId === 'string') {
      players = await playersService.getByTeam(teamId);
    } else {
      players = await playersService.getAll();
    }
    
    return res.json({ 
      success: true, 
      data: players 
    });
  } catch (error) {
    next(error);
  }
};

export const createPlayer = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const playerData = req.body;
    const player = await playersService.create(playerData);
    return res.status(201).json({ 
      success: true, 
      data: player 
    });
  } catch (error) {
    next(error);
  }
};

export const updatePlayer = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { id } = req.params;
    const playerData = req.body;
    const player = await playersService.update(id, playerData);
    return res.json({ 
      success: true, 
      data: player 
    });
  } catch (error) {
    next(error);
  }
};

export const deletePlayer = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { id } = req.params;
    await playersService.delete(id);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

