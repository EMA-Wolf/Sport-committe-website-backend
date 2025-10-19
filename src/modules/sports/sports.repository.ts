import prisma from '../../config/prisma';
import { Sports } from '@prisma/client';

/**
 * Find sport by ID
 */
export const findSportById = async (id: string): Promise<Sports | null> => {
  return await prisma.sports.findUnique({
    where: { id },
    include: {
      teams: true,
      seasons: true
    }
  });
};

/**
 * Find sport by name
 */
export const findSportByName = async (name: string): Promise<Sports | null> => {
  return await prisma.sports.findFirst({
    where: { 
      name: {
        equals: name,
        mode: 'insensitive'
      }
    }
  });
};

/**
 * Get all sports
 */
export const findAllSports = async (): Promise<Sports[]> => {
  return await prisma.sports.findMany({
    include: {
      teams: true,
      seasons: true
    }
  });
};

/**
 * Create a new sport
 */
export const createSport = async (name: string): Promise<Sports> => {
  return await prisma.sports.create({
    data: { name }
  });
};

/**
 * Update sport
 */
export const updateSport = async (id: string, name: string): Promise<Sports> => {
  return await prisma.sports.update({
    where: { id },
    data: { name }
  });
};

/**
 * Delete sport
 */
export const deleteSport = async (id: string): Promise<void> => {
  await prisma.sports.delete({
    where: { id }
  });
};

/**
 * Ensure sport exists, create if not
 */
export const ensureSportExists = async (name: string): Promise<Sports> => {
  let sport = await findSportByName(name);
  
  if (!sport) {
    sport = await createSport(name);
    console.log(`✅ Created new sport: ${name}`);
  }
  
  return sport;
};

