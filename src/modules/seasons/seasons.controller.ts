import { Request, Response, NextFunction } from 'express';
import { SeasonsService } from './seasons.service';

const seasonsService = new SeasonsService();

export const getSeason = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { id } = req.params;
    const season = await seasonsService.get(id);
    
    if (!season) {
      return res.status(404).json({ 
        success: false, 
        message: 'Season not found' 
      });
    }

    return res.json({ 
      success: true, 
      data: season 
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSeasons = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const seasons = await seasonsService.getAll();
    return res.json({ 
      success: true, 
      data: seasons 
    });
  } catch (error) {
    next(error);
  }
};

export const createSeason = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const seasonData = req.body;
    const season = await seasonsService.create(seasonData);
    return res.status(201).json({ 
      success: true, 
      data: season 
    });
  } catch (error) {
    next(error);
  }
};

export const updateSeason = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { id } = req.params;
    const seasonData = req.body;
    const season = await seasonsService.update(id, seasonData);
    return res.json({ 
      success: true, 
      data: season 
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSeason = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { id } = req.params;
    await seasonsService.delete(id);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

