import * as playersRepo from './players.repository';
import { Player } from '@prisma/client';

export class PlayersService {
  async get(id: string): Promise<Player | null> {
    return await playersRepo.findPlayerById(id);
  }

  async getAll(): Promise<Player[]> {
    return await playersRepo.findAllPlayers();
  }

  async getByTeam(teamId: string): Promise<Player[]> {
    return await playersRepo.findPlayersByTeam(teamId);
  }

  async getBySport(sportIdOrName: string): Promise<Player[]> {
    return await playersRepo.findPlayersBySport(sportIdOrName);
  }

  async create(playerData: any): Promise<Player> {
    const data = {
      name: playerData.name,
      teamId: playerData.teamId,
      positions: playerData.positions || [],
      jerseyNumber: playerData.jerseyNumber || 0
    };

    return await playersRepo.createPlayer(data);
  }

  async upsert(playerData: any): Promise<Player> {
    const data = {
      id: playerData.id,
      name: playerData.name,
      teamId: playerData.teamId,
      positions: playerData.positions || [],
      jerseyNumber: playerData.jerseyNumber || 0
    };

    return await playersRepo.upsertPlayer(playerData.id, data);
  }

  async update(id: string, playerData: any): Promise<Player> {
    const data: any = {
      name: playerData.name,
      positions: playerData.positions,
      jerseyNumber: playerData.jerseyNumber
    };

    if (playerData.teamId) {
      data.teamId = playerData.teamId;
    }

    return await playersRepo.updatePlayer(id, data);
  }

  async delete(id: string): Promise<void> {
    const player = await playersRepo.findPlayerById(id);
    if (!player) {
      throw new Error(`Player with id "${id}" not found`);
    }
    
    return await playersRepo.deletePlayer(id);
  }
}

