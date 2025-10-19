import { WebhookContext } from '../../../shared/types/sanity.types';
import { PlayersService } from '../../players/players.service';
import { validatePayload } from '../../../shared/utils/validators';

const playersService = new PlayersService();

/**
 * Handle player creation or update from Sanity webhook
 */
export const handlePlayerCreateOrUpdate = async (context: WebhookContext): Promise<void> => {
  const { payload } = context;
  
  // Validate required fields
  validatePayload(payload, ['_id', 'name']);

  // Prepare player data
  const playerData = {
    id: payload._id,
    name: payload.name,
    teamId: payload.team?._ref,
    positions: payload.positions || [],
    jerseyNumber: payload.jerseyNumber || 0
  };

  // Upsert player
  await playersService.upsert(playerData);
  console.log(`✅ Player "${payload.name}" processed successfully`);
};

/**
 * Handle player deletion from Sanity webhook
 */
export const handlePlayerDelete = async (context: WebhookContext): Promise<void> => {
  const { payload } = context;
  
  // Validate required fields
  validatePayload(payload, ['_id']);

  // Delete player
  await playersService.delete(payload._id);
  console.log(`✅ Player with ID "${payload._id}" deleted successfully`);
};

