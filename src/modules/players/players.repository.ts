import prisma from '../../config/prisma';
import { Player } from '@prisma/client';
import { z } from 'zod';
/**
 * Find player by ID
 */
export const findPlayerById = async (id: string): Promise<Player | null> => {
  return await prisma.player.findUnique({
    where: { id },
    include: {
      team: {
        include: {
          sports: true
        }
      },
      stats: true,
      lineups: {
        include: {
          match: true
        }
      }
    }
  });
};

/**
 * Get all players
 */
export const findAllPlayers = async (): Promise<Player[]> => {
  return await prisma.player.findMany({
    include: {
      team: {
        include: {
          sports: true
        }
      },
      stats: true
    }
  });
};

/**
 * Find players by team
 */
export const findPlayersByTeam = async (teamId: string): Promise<Player[]> => {
  return await prisma.player.findMany({
    where: { teamId },
    include: {
      team: true,
      stats: true
    }
  });
};

/**
 * Find players by sport (either by sportId or sport name)
 */
export const findPlayersBySport = async (sportIdOrName: string): Promise<Player[]> => {
  // Try to find by sport ID first, then by sport name
  return await prisma.player.findMany({
    where: {
      team: {
        OR: [
          (z.uuid().safeParse(sportIdOrName).success ? { sportsId: sportIdOrName } : {}),
          { 
            sports: { 
              name: {
                equals: sportIdOrName,
                mode: 'insensitive'
              }
            }
          }
        ]
      }
    },
    include: {
      team: {
        include: {
          sports: true
        }
      },
      stats: true
    }
  });
};

/**
 * Create a new player
 */
export const createPlayer = async (data: any): Promise<Player> => {
  return await prisma.player.create({ 
    data,
    include: {
      team: true
    }
  });
};

/**
 * Update player
 */
export const updatePlayer = async (id: string, data: any): Promise<Player> => {
  return await prisma.player.update({
    where: { id },
    data,
    include: {
      team: true
    }
  });
};

/**
 * Delete player
 */
export const deletePlayer = async (id: string): Promise<void> => {
  await prisma.player.delete({
    where: { id }
  });
};

/**
 * Upsert player (create or update)
 */
export const upsertPlayer = async (id: string, data: any): Promise<Player> => {
  return await prisma.player.upsert({
    where: { id },
    create: data,
    update: data,
    include: {
      team: true
    }
  });
};

