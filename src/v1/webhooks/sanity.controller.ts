import { Request, Response } from 'express';

import { 
    handleSanityTeamWebhook, 
    handleSanityMatchWebhook, 
    handleSanitySeasonWebhook, 
    handleSanityPlayersWebhook 
} from './sanityWebhook';

import { deleteMatch, deleteSeason, deleteTeam } from './sanityDeletionWebhooks';


// Handles creation or update of Sanity webhooks
// This function will be called when a document is created or updated in Sanity
export const sanityCreationOrUpdateWebhook = async (req: Request, res: Response):Promise<any> => {
    try {
        const { body } = req;
        console.log('Webhook received:', body);
        console.log("request:", req)

        if(body._type === 'teams'){ 
            handleSanityTeamWebhook(body)
        }

        if(body._type === 'fixtures'){ 
            handleSanityMatchWebhook(body)
        }

        if(body._type === 'seasons'){ 
            handleSanitySeasonWebhook(body)
        }

        if(body._type === "players"){
            handleSanityPlayersWebhook(body)
        }
        console.log('Creation/Updation Webhook processed successfully');
        return res.status(200).json({ success: true, message: 'Webhook processed successfully' });
    } catch (error:any) {
        console.error('Error processing webhook:', error);
        return res.status(500).json({ success: false, message: 'Failed to process webhook', error: error.message });
    }
};

// Handles deletion of Sanity webhooks
// This function will be called when a document is deleted in Sanity
export const sanityDeleteWebhook = async (req: Request, res: Response): Promise<any> => {
    try {
        const { body } = req;
        console.log('Delete webhook received:', body);

        if(body._type === 'teams') {
            await deleteTeam(body);
        }   
        if(body._type === 'fixtures') {
            await deleteMatch(body);
        }

        if(body._type === 'seasons') {
            await deleteSeason(body);
        }
        console.log('Deletion Webhook processed successfully');
        return res.status(200).json({ success: true, message: 'Webhook processed successfully' });
    } catch (error:any) {
        console.error('Error processing delete webhook:', error);
        return res.status(500).json({ success: false, message: 'Failed to process delete webhook', error: error.message });
    }
}