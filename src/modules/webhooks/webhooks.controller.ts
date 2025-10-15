import { Request, Response, NextFunction } from 'express';
import { WebhookContext, SanityEventType } from '../../shared/types/sanity.types';
import * as teamHandlers from './handlers/team-webhook.handler';
import * as matchHandlers from './handlers/match-webhook.handler';
import * as seasonHandlers from './handlers/season-webhook.handler';
import * as playerHandlers from './handlers/player-webhook.handler';

// Handler registry for creation/update events
const createHandlers: Record<string, (context: WebhookContext) => Promise<void>> = {
  teams: teamHandlers.handleTeamCreateOrUpdate,
  fixtures: matchHandlers.handleMatchCreateOrUpdate,
  seasons: seasonHandlers.handleSeasonCreateOrUpdate,
  players: playerHandlers.handlePlayerCreateOrUpdate,
};

// Handler registry for deletion events
const deleteHandlers: Record<string, (context: WebhookContext) => Promise<void>> = {
  teams: teamHandlers.handleTeamDelete,
  fixtures: matchHandlers.handleMatchDelete,
  seasons: seasonHandlers.handleSeasonDelete,
  players: playerHandlers.handlePlayerDelete,
};

/**
 * Handle Sanity creation or update webhook
 */
export const handleSanityCreationOrUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { body } = req;
    console.log('📥 Webhook received:', { type: body._type, id: body._id });

    const context: WebhookContext = {
      eventType: SanityEventType.CREATE,
      payload: body
    };

    const handler = createHandlers[body._type];

    if (!handler) {
      console.warn(`⚠️  No handler found for type: ${body._type}`);
      return res.status(200).json({
        success: true,
        message: 'Webhook received but no handler configured'
      });
    }

    await handler(context);

    return res.status(200).json({
      success: true,
      message: 'Webhook processed successfully'
    });
  } catch (error: any) {
    console.error('❌ Error processing webhook:', error);
    next(error);
  }
};

/**
 * Handle Sanity deletion webhook
 */
export const handleSanityDeletion = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { body } = req;
    console.log('📥 Delete webhook received:', { type: body._type, id: body._id });

    const context: WebhookContext = {
      eventType: SanityEventType.DELETE,
      payload: body
    };

    const handler = deleteHandlers[body._type];

    if (!handler) {
      console.warn(`⚠️  No handler found for type: ${body._type}`);
      return res.status(200).json({
        success: true,
        message: 'Delete webhook received but no handler configured'
      });
    }

    await handler(context);

    return res.status(200).json({
      success: true,
      message: 'Delete webhook processed successfully'
    });
  } catch (error: any) {
    console.error('❌ Error processing delete webhook:', error);
    next(error);
  }
};

