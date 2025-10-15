import { WebhookContext } from '../../../shared/types/sanity.types';

export interface IWebhookHandler {
  handleCreateOrUpdate(context: WebhookContext): Promise<void>;
  handleDelete(context: WebhookContext): Promise<void>;
}

export abstract class BaseWebhookHandler implements IWebhookHandler {
  abstract handleCreateOrUpdate(context: WebhookContext): Promise<void>;
  abstract handleDelete(context: WebhookContext): Promise<void>;
}

