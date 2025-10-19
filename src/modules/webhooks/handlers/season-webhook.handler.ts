import { WebhookContext } from '../../../shared/types/sanity.types';
import { SeasonsService } from '../../seasons/seasons.service';
import { validatePayload } from '../../../shared/utils/validators';

const seasonsService = new SeasonsService();

/**
 * Handle season creation or update from Sanity webhook
 */
export const handleSeasonCreateOrUpdate = async (context: WebhookContext): Promise<void> => {
  const { payload } = context;
  
  // Validate required fields
  validatePayload(payload, ['_id', 'title']);

  // Prepare season data
  const seasonData = {
    id: payload._id,
    season: payload.title,
    startDate: payload.startDate,
    endDate: payload.endDate
  };

  // Upsert season
  await seasonsService.upsert(seasonData);
  console.log(`✅ Season "${payload.title}" processed successfully`);
};

/**
 * Handle season deletion from Sanity webhook
 */
export const handleSeasonDelete = async (context: WebhookContext): Promise<void> => {
  const { payload } = context;
  
  // Validate required fields
  validatePayload(payload, ['_id']);

  // Delete season
  await seasonsService.delete(payload._id);
  console.log(`✅ Season with ID "${payload._id}" deleted successfully`);
};

