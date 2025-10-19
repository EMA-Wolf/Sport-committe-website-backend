export interface SanityWebhookPayload<T = any> {
  _id: string;
  _type: string;
  _rev?: string;
  [key: string]: any;
}

export enum SanityEventType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete'
}

export interface WebhookContext {
  eventType: SanityEventType;
  payload: SanityWebhookPayload;
}
