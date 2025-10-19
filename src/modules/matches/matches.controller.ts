import { Request, Response, NextFunction } from 'express';
import { MatchesService } from './matches.service';

const matchesService = new MatchesService();

export const getMatch = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { id } = req.params;
    const match = await matchesService.get(id);
    
    if (!match) {
      return res.status(404).json({ 
        success: false, 
        message: 'Match not found' 
      });
    }

    return res.json({ 
      success: true, 
      data: match 
    });
  } catch (error) {
    next(error);
  }
};

export const getAllMatches = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { seasonId } = req.query;
    
    let matches;
    if (seasonId && typeof seasonId === 'string') {
      matches = await matchesService.getBySeason(seasonId);
    } else {
      matches = await matchesService.getAll();
    }
    
    return res.json({ 
      success: true, 
      data: matches 
    });
  } catch (error) {
    next(error);
  }
};

export const createMatch = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const matchData = req.body;
    const match = await matchesService.create(matchData);
    return res.status(201).json({ 
      success: true, 
      data: match 
    });
  } catch (error) {
    next(error);
  }
};

export const updateMatch = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { id } = req.params;
    const matchData = req.body;
    const match = await matchesService.update(id, matchData);
    return res.json({ 
      success: true, 
      data: match 
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMatch = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { id } = req.params;
    await matchesService.delete(id);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

