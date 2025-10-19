import * as seasonsRepo from './seasons.repository';
import { Season } from '@prisma/client';

export class SeasonsService {
  async get(id: string): Promise<Season | null> {
    return await seasonsRepo.findSeasonById(id);
  }

  async getAll(): Promise<Season[]> {
    return await seasonsRepo.findAllSeasons();
  }

  async create(seasonData: any): Promise<Season> {
    const data = {
      season: seasonData.season,
      startDate: seasonData.startDate ? new Date(seasonData.startDate) : undefined,
      endDate: seasonData.endDate ? new Date(seasonData.endDate) : undefined
    };

    return await seasonsRepo.createSeason(data);
  }

  async upsert(seasonData: any): Promise<Season> {
    const data = {
      id: seasonData.id,
      season: seasonData.season,
      startDate: seasonData.startDate ? new Date(seasonData.startDate) : undefined,
      endDate: seasonData.endDate ? new Date(seasonData.endDate) : undefined
    };

    return await seasonsRepo.upsertSeason(seasonData.id, data);
  }

  async update(id: string, seasonData: any): Promise<Season> {
    const data: any = {
      season: seasonData.season,
      startDate: seasonData.startDate ? new Date(seasonData.startDate) : undefined,
      endDate: seasonData.endDate ? new Date(seasonData.endDate) : undefined
    };

    return await seasonsRepo.updateSeason(id, data);
  }

  async delete(id: string): Promise<void> {
    const season = await seasonsRepo.findSeasonById(id);
    if (!season) {
      throw new Error(`Season with id "${id}" not found`);
    }
    
    return await seasonsRepo.deleteSeason(id);
  }
}

