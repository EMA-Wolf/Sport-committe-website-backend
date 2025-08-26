import prisma from "../../config/prisma";

export const deleteTeam = async (body: any) => {
    const teamId = body._id;
    if (!teamId) {
        throw new Error("Team ID is required for deletion.");
    }
    // Delete the team from the database
    await prisma.team.delete({
      where: { id: teamId },
    });
    console.log(`Team with ID ${teamId} deleted successfully.`);
};

export const deleteMatch = async (body: any) => {
    const matchId = body._id;
    if (!matchId) {
        throw new Error("Match ID is required for deletion.");
    }
    // Delete the match from the database
    await prisma.match.delete({
      where: { id: matchId },
    });
    console.log(`Match with ID ${matchId} deleted successfully.`);
};

export const deleteSeason = async (body: any) => {
    const seasonId = body._id;
    if (!seasonId) {
        throw new Error("Season ID is required for deletion.");
    }
    // Delete the season from the database
    await prisma.season.delete({
      where: { id: seasonId },
    });
    console.log(`Season with ID ${seasonId} deleted successfully.`);
};

export const deletePlayer = async (body: any) => {
    const playerId = body._id;
    if (!playerId) {
        throw new Error("Player ID is required for deletion.");
    }
    // Delete the player from the database
    await prisma.player.delete({
      where: { id: playerId },
    });
    console.log(`Player with ID ${playerId} deleted successfully.`);
};

export const deleteSport = async (body: any) => {
    const sportId = body._id;
    if (!sportId) {
        throw new Error("Sport ID is required for deletion.");
    }
    // Delete the sport from the database
    await prisma.sports.delete({
      where: { id: sportId },
    });
    console.log(`Sport with ID ${sportId} deleted successfully.`);
}

