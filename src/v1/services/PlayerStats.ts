import prisma from "../../config/prisma";

export const getPlayerStats = async (playerId: string) => {
  const playerStats = await prisma.playerStats.findUnique({
    where: { id: playerId },
    select: {
      id: true,
      goals: true,
      assists: true,
      yellowCards: true,
      redCards: true,
      cleanSheets: true,
      player: {
        select: {
          id: true,
          name: true,
            team: {
                select: {
                id: true,
                name: true,
                },
            },
        },
      },
    },
  });
  return playerStats;
};

export const getAllPlayerStatsForASeason = async (seasonId: string) => {
  const playerStats = await prisma.playerStats.findMany({
    where: { seasonId: seasonId },
   select: {
        id: true,
        goals: true,
        assists: true,
        yellowCards: true,
        redCards: true,
        cleanSheets: true,
        player: {
            select: {
            id: true,
            name: true,
            team: {
                select: {
                id: true,
                name: true,
                },
            },
            },
        },
   }
  });
  return playerStats;
};