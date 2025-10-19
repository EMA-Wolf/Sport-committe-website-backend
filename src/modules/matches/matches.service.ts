import * as matchesRepo from './matches.repository';
import * as seasonsRepo from '../seasons/seasons.repository';
import { Match } from '@prisma/client';
import client from '../../config/sanityClient';

export class MatchesService {
  async get(id: string): Promise<Match | null> {
    return await matchesRepo.findMatchById(id);
  }

  async getAll(): Promise<Match[]> {
    return await matchesRepo.findAllMatches();
  }

  async getBySeason(seasonId: string): Promise<Match[]> {
    return await matchesRepo.findMatchesBySeason(seasonId);
  }

  async create(matchData: any): Promise<Match> {
    const data = {
      matchDate: new Date(matchData.matchDate),
      homeTeamId: matchData.homeTeamId,
      awayTeamId: matchData.awayTeamId,
      seasonId: matchData.seasonId,
      homeScore: matchData.homeScore,
      awayScore: matchData.awayScore,
      homeFormation: matchData.homeFormation,
      awayFormation: matchData.awayFormation,
      division: matchData.division
    };

    const match = await matchesRepo.createMatch(data);

    // Handle lineups if provided
    if (matchData.lineups) {
      await this.handleLineups(match.id, matchData.homeTeamId, matchData.awayTeamId, matchData.lineups);
    }

    return match;
  }

  async upsert(matchData: any): Promise<Match> {
    const { id, matchDate, homeTeamId, awayTeamId, seasonId, homeScore, awayScore, lineups } = matchData;

    // Ensure season exists
    let season = await seasonsRepo.findSeasonById(seasonId);
    
    if (!season) {
      // Fetch from Sanity if not in DB
      const seasonFromSanity = await client.fetch(
        `*[_type == "seasons" && _id == $id][0]{_id, title, startDate, endDate}`,
        { id: seasonId }
      );

      if (seasonFromSanity) {
        season = await seasonsRepo.upsertSeason(seasonFromSanity._id, {
          id: seasonFromSanity._id,
          season: seasonFromSanity.title,
          startDate: seasonFromSanity.startDate,
          endDate: seasonFromSanity.endDate
        });
      } else {
        throw new Error(`Season with id ${seasonId} not found`);
      }
    }

    // Upsert match
    const match = await matchesRepo.upsertMatch(id, {
      id,
      matchDate: new Date(matchDate),
      homeTeamId,
      awayTeamId,
      seasonId: season.id,
      homeScore,
      awayScore
    });

    // Handle lineups if provided
    if (lineups) {
      await this.handleLineups(id, homeTeamId, awayTeamId, lineups);
    }

    return match;
  }

  async update(id: string, matchData: any): Promise<Match> {
    const data: any = {
      matchDate: matchData.matchDate ? new Date(matchData.matchDate) : undefined,
      homeScore: matchData.homeScore,
      awayScore: matchData.awayScore,
      homeFormation: matchData.homeFormation,
      awayFormation: matchData.awayFormation
    };

    const match = await matchesRepo.updateMatch(id, data);

    // Handle lineups if provided
    if (matchData.lineups) {
      const existingMatch = await matchesRepo.findMatchById(id);
      if (existingMatch) {
        await this.handleLineups(id, existingMatch.homeTeamId, existingMatch.awayTeamId, matchData.lineups);
      }
    }

    return match;
  }

  async delete(id: string): Promise<void> {
    const match = await matchesRepo.findMatchById(id);
    if (!match) {
      throw new Error(`Match with id "${id}" not found`);
    }
    
    return await matchesRepo.deleteMatch(id);
  }

  private async handleLineups(matchId: string, homeTeamId: string, awayTeamId: string, lineups: any) {
    // Delete old lineups first
    await matchesRepo.deleteLineupsForMatch(matchId);

    // Create new lineups
    await this.createLineups(matchId, homeTeamId, lineups.homeLineup, true);
    await this.createLineups(matchId, awayTeamId, lineups.awayLineup, true);
    await this.createLineups(matchId, homeTeamId, lineups.homeSubstitutes, false);
    await this.createLineups(matchId, awayTeamId, lineups.awaySubstitutes, false);
  }

  private async createLineups(matchId: string, teamId: string, playerRefs: any[], isStarter: boolean) {
    if (playerRefs && Array.isArray(playerRefs)) {
      for (const playerRef of playerRefs) {
        if (playerRef?._ref) {
          await matchesRepo.createLineup({
            matchId,
            playerId: playerRef._ref,
            teamId,
            isStarter
          });
        }
      }
    }
  }
}

