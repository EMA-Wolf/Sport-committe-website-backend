import { WebhookContext } from '../../../shared/types/sanity.types';
import { MatchesService } from '../../matches/matches.service';
import { validatePayload } from '../../../shared/utils/validators';

const matchesService = new MatchesService();

/**
 * Handle match creation or update from Sanity webhook
 */
export const handleMatchCreateOrUpdate = async (context: WebhookContext): Promise<void> => {
  const { payload } = context;
  
  // Validate required fields
  validatePayload(payload, ['_id', 'date', 'homeTeam', 'awayTeam', 'season']);

  // Prepare match data
  const matchData = {
    id: payload._id,
    matchDate: payload.date,
    homeTeamId: payload.homeTeam?._ref,
    awayTeamId: payload.awayTeam?._ref,
    seasonId: payload.season?._ref,
    homeScore: payload.homeScore,
    awayScore: payload.awayScore,
    lineups: payload.Lineups
  };

  // Validate team and season references
  if (!matchData.homeTeamId || !matchData.awayTeamId || !matchData.seasonId) {
    throw new Error('Missing team or season reference in match data');
  }

  // Upsert match
  await matchesService.upsert(matchData);
  console.log(`✅ Match processed successfully`);
};

/**
 * Handle match deletion from Sanity webhook
 */
export const handleMatchDelete = async (context: WebhookContext): Promise<void> => {
  const { payload } = context;
  
  // Validate required fields
  validatePayload(payload, ['_id']);

  // Delete match
  await matchesService.delete(payload._id);
  console.log(`✅ Match with ID "${payload._id}" deleted successfully`);
};

