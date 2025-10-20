import * as teamsRepo from './teams.repository';
import * as sportsRepo from '../sports/sports.repository';
import { Team, Division } from '@prisma/client';

export class TeamsService {
  async get(id: string): Promise<Team | null> {
    return await teamsRepo.findTeamById(id);
  }

  async getAll(): Promise<Team[]> {
    return await teamsRepo.findAllTeams();
  }

  async getBySport(sportIdOrName: string): Promise<Team[]> {
    return await teamsRepo.findTeamsBySport(sportIdOrName);
  }

  async create(teamData: any): Promise<Team> {
    const division = this.mapDivision(teamData.division);
    const sport = await sportsRepo.ensureSportExists(teamData.sport);

    const data = {
      name: teamData.name,
      logo: teamData.logo,
      coach: teamData.coach,
      sportsId: sport.id,
      division
    };

    return await teamsRepo.createTeam(data);
  }

  async upsert(teamData: any): Promise<Team> {
    const division = this.mapDivision(teamData.division);
    const sport = await sportsRepo.ensureSportExists(teamData.sport);

    const data = {
      id: teamData.id,
      name: teamData.name,
      logo: teamData.logo,
      coach: teamData.coach,
      sportsId: sport.id,
      division
    };

    return await teamsRepo.upsertTeam(teamData.id, data);
  }

  async update(id: string, teamData: any): Promise<Team> {
    const division = this.mapDivision(teamData.division);
    
    const data: any = {
      name: teamData.name,
      logo: teamData.logo,
      coach: teamData.coach,
      division
    };

    if (teamData.sport) {
      const sport = await sportsRepo.ensureSportExists(teamData.sport);
      data.sportsId = sport.id;
    }

    return await teamsRepo.updateTeam(id, data);
  }

  async delete(id: string): Promise<void> {
    const team = await teamsRepo.findTeamById(id);
    if (!team) {
      throw new Error(`Team with id "${id}" not found`);
    }
    
    return await teamsRepo.deleteTeam(id);
  }

  private mapDivision(division?: string): Division {
    switch (division?.toLowerCase()) {
      case 'men':
        return Division.MEN;
      case 'women':
        return Division.WOMEN;
      case 'mixed':
        return Division.MIXED;
      default:
        return Division.MEN;
    }
  }
}

