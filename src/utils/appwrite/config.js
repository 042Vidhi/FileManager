import { Client, Storage} from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6639273e00090126fc69'); // Replace with your project ID

export const BUCKET_ID = '6639278a001a2329d097'

export const storage = new Storage(client);
export { ID } from 'appwrite';
