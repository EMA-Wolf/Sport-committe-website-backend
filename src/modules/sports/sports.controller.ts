import { Request, Response, NextFunction } from 'express';
import { SportsService } from './sports.service';

const sportsService = new SportsService();

export const getSport = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { id } = req.params;
    const sport = await sportsService.get(id);
    
    if (!sport) {
      return res.status(404).json({ 
        success: false, 
        message: 'Sport not found' 
      });
    }

    return res.json({ 
      success: true, 
      data: sport 
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSports = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const sports = await sportsService.getAll();
    return res.json({ 
      success: true, 
      data: sports 
    });
  } catch (error) {
    next(error);
  }
};

export const createSport = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ 
        success: false, 
        message: 'Sport name is required' 
      });
    }

    const sport = await sportsService.create(name);
    return res.status(201).json({ 
      success: true, 
      data: sport 
    });
  } catch (error) {
    next(error);
  }
};

export const updateSport = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ 
        success: false, 
        message: 'Sport name is required' 
      });
    }

    const sport = await sportsService.update(id, name);
    return res.json({ 
      success: true, 
      data: sport 
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSport = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { id } = req.params;
    await sportsService.delete(id);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

