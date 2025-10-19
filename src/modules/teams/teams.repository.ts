import prisma from '../../config/prisma';
import { Team } from '@prisma/client';

/**
 * Find team by ID
 */
export const findTeamById = async (id: string): Promise<Team | null> => {
  return await prisma.team.findUnique({
    where: { id },
    include: {
      players: true,
      sports: true,
      matchesHome: true,
      matchesAway: true
    }
  });
};

/**
 * Get all teams
 */
export const findAllTeams = async (): Promise<Team[]> => {
  return await prisma.team.findMany({
    include: {
      players: true,
      sports: true
    }
  });
};

/**
 * Create a new team
 */
export const createTeam = async (data: any): Promise<Team> => {
  return await prisma.team.create({ 
    data,
    include: {
      players: true,
      sports: true
    }
  });
};

/**
 * Update team
 */
export const updateTeam = async (id: string, data: any): Promise<Team> => {
  return await prisma.team.update({
    where: { id },
    data,
    include: {
      players: true,
      sports: true
    }
  });
};

/**
 * Delete team
 */
export const deleteTeam = async (id: string): Promise<void> => {
  await prisma.team.delete({
    where: { id }
  });
};

/**
 * Upsert team (create or update)
 */
export const upsertTeam = async (id: string, data: any): Promise<Team> => {
  return await prisma.team.upsert({
    where: { id },
    create: data,
    update: data,
    include: {
      players: true,
      sports: true
    }
  });
};

