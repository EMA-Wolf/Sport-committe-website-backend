import {Request, Response} from 'express';
import { getPlayerStats, getAllPlayerStatsForASeason } from '../services/PlayerStats';

export const getPlayerStatsController = async (req: Request, res: Response): Promise<any> => {
  const playerId = req.params.id;

  try {
    const playerStats = await getPlayerStats(playerId);
    
    if (!playerStats) {
      return res.status(404).json({ success: false, message: 'Player stats not found' });
    }

    return res.status(200).json({ success: true, data: playerStats });
  } catch (error) {
    console.error('Error fetching player stats:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getAllPlayerStatsForASeasonController = async (req: Request, res: Response): Promise<any> => {
  const seasonId = req.params.seasonId;

  try {
    const playerStats = await getAllPlayerStatsForASeason(seasonId);
    
    if (!playerStats || playerStats.length === 0) {
      return res.status(404).json({ success: false, message: 'No player stats found for this season' });
    }

    return res.status(200).json({ success: true, data: playerStats });
  } catch (error) {
    console.error('Error fetching player stats for season:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};