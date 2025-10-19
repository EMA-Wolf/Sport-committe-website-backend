import prisma from '../../config/prisma';
import { Match, Lineup } from '@prisma/client';

/**
 * Find match by ID
 */
export const findMatchById = async (id: string): Promise<Match | null> => {
  return await prisma.match.findUnique({
    where: { id },
    include: {
      homeTeam: true,
      awayTeam: true,
      season: true,
      lineups: {
        include: {
          player: true,
          team: true
        }
      },
      events: {
        include: {
          player: true
        }
      },
      stats: true
    }
  });
};

/**
 * Get all matches
 */
export const findAllMatches = async (): Promise<Match[]> => {
  return await prisma.match.findMany({
    include: {
      homeTeam: true,
      awayTeam: true,
      season: true,
      lineups: {
        include: {
          player: true
        }
      }
    },
    orderBy: {
      matchDate: 'desc'
    }
  });
};

/**
 * Find matches by season
 */
export const findMatchesBySeason = async (seasonId: string): Promise<Match[]> => {
  return await prisma.match.findMany({
    where: { seasonId },
    include: {
      homeTeam: true,
      awayTeam: true,
      lineups: {
        include: {
          player: true
        }
      }
    },
    orderBy: {
      matchDate: 'desc'
    }
  });
};

/**
 * Create a new match
 */
export const createMatch = async (data: any): Promise<Match> => {
  return await prisma.match.create({ 
    data,
    include: {
      homeTeam: true,
      awayTeam: true,
      season: true
    }
  });
};

/**
 * Update match
 */
export const updateMatch = async (id: string, data: any): Promise<Match> => {
  return await prisma.match.update({
    where: { id },
    data,
    include: {
      homeTeam: true,
      awayTeam: true,
      season: true
    }
  });
};

/**
 * Delete match
 */
export const deleteMatch = async (id: string): Promise<void> => {
  await prisma.match.delete({
    where: { id }
  });
};

/**
 * Upsert match (create or update)
 */
export const upsertMatch = async (id: string, data: any): Promise<Match> => {
  return await prisma.match.upsert({
    where: { id },
    create: data,
    update: data,
    include: {
      homeTeam: true,
      awayTeam: true,
      season: true
    }
  });
};

/**
 * Create lineup
 */
export const createLineup = async (data: any): Promise<Lineup> => {
  return await prisma.lineup.create({ data });
};

/**
 * Delete lineups for a match
 */
export const deleteLineupsForMatch = async (matchId: string): Promise<void> => {
  await prisma.lineup.deleteMany({
    where: { matchId }
  });
};

/**
 * Get lineups for a match
 */
export const getLineupsForMatch = async (matchId: string): Promise<Lineup[]> => {
  return await prisma.lineup.findMany({
    where: { matchId },
    include: {
      player: true,
      team: true
    }
  });
};

