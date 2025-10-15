import { WebhookContext } from '../../../shared/types/sanity.types';
import { TeamsService } from '../../teams/teams.service';
import { validatePayload } from '../../../shared/utils/validators';

const teamsService = new TeamsService();

/**
 * Handle team creation or update from Sanity webhook
 */
export const handleTeamCreateOrUpdate = async (context: WebhookContext): Promise<void> => {
  const { payload } = context;
  
  // Validate required fields
  validatePayload(payload, ['_id', 'name', 'sport']);

  // Prepare team data
  const teamData = {
    id: payload._id,
    name: payload.name,
    logo: payload.logo?.asset?.url || null,
    coach: payload.coach,
    sport: payload.sport,
    division: payload.division
  };

  // Upsert team
  await teamsService.upsert(teamData);
  console.log(`✅ Team "${payload.name}" processed successfully`);
};

/**
 * Handle team deletion from Sanity webhook
 */
export const handleTeamDelete = async (context: WebhookContext): Promise<void> => {
  const { payload } = context;
  
  // Validate required fields
  validatePayload(payload, ['_id']);

  // Delete team
  await teamsService.delete(payload._id);
  console.log(`✅ Team with ID "${payload._id}" deleted successfully`);
};

