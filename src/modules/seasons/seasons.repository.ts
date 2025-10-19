import prisma from '../../config/prisma';
import { Season } from '@prisma/client';

/**
 * Find season by ID
 */
export const findSeasonById = async (id: string): Promise<Season | null> => {
  return await prisma.season.findUnique({
    where: { id },
    include: {
      matches: true,
      standings: true,
      sports: true
    }
  });
};

/**
 * Get all seasons
 */
export const findAllSeasons = async (): Promise<Season[]> => {
  return await prisma.season.findMany({
    include: {
      matches: true,
      standings: true,
      sports: true
    }
  });
};

/**
 * Create a new season
 */
export const createSeason = async (data: any): Promise<Season> => {
  return await prisma.season.create({ 
    data,
    include: {
      matches: true,
      standings: true
    }
  });
};

/**
 * Update season
 */
export const updateSeason = async (id: string, data: any): Promise<Season> => {
  return await prisma.season.update({
    where: { id },
    data,
    include: {
      matches: true,
      standings: true
    }
  });
};

/**
 * Delete season
 */
export const deleteSeason = async (id: string): Promise<void> => {
  await prisma.season.delete({
    where: { id }
  });
};

/**
 * Upsert season (create or update)
 */
export const upsertSeason = async (id: string, data: any): Promise<Season> => {
  return await prisma.season.upsert({
    where: { id },
    create: data,
    update: data,
    include: {
      matches: true,
      standings: true
    }
  });
};

