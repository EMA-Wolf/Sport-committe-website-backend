import {createClient, type ClientConfig} from '@sanity/client'
import dotenv from 'dotenv'
dotenv.config()

const config: ClientConfig = {
  projectId: process.env.VITE_SanityProjectId || 'your-project-id',
  dataset: process.env.VITE_SanityDataset || 'your-dataset-name',
  useCdn:false,
  apiVersion: process.env.VITE_SanityApiVersion || '2025-02-06',
  token: process.env.VITE_SanityToken || 'your-sanity-token',
}
// console.log(config)
const client = createClient(config)

export default client