import * as sportsRepo from './sports.repository';
import { Sports } from '@prisma/client';

export class SportsService {
  async get(id: string): Promise<Sports | null> {
    return await sportsRepo.findSportById(id);
  }

  async getByName(name: string): Promise<Sports | null> {
    return await sportsRepo.findSportByName(name);
  }

  async getAll(): Promise<Sports[]> {
    return await sportsRepo.findAllSports();
  }

  async create(name: string): Promise<Sports> {
    // Check if sport already exists
    const existing = await sportsRepo.findSportByName(name);
    if (existing) {
      throw new Error(`Sport with name "${name}" already exists`);
    }

    return await sportsRepo.createSport(name);
  }

  async update(id: string, name: string): Promise<Sports> {
    // Check if sport exists
    const sport = await sportsRepo.findSportById(id);
    if (!sport) {
      throw new Error(`Sport with id "${id}" not found`);
    }

    // Check if new name conflicts with another sport
    const existing = await sportsRepo.findSportByName(name);
    if (existing && existing.id !== id) {
      throw new Error(`Sport with name "${name}" already exists`);
    }

    return await sportsRepo.updateSport(id, name);
  }

  async delete(id: string): Promise<void> {
    const sport = await sportsRepo.findSportById(id);
    if (!sport) {
      throw new Error(`Sport with id "${id}" not found`);
    }

    return await sportsRepo.deleteSport(id);
  }

  async ensureExists(name: string): Promise<Sports> {
    return await sportsRepo.ensureSportExists(name);
  }
}

