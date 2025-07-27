import { VercelRequest, VercelResponse } from '@vercel/node';
import { app } from './app';
import serverless from 'serverless-http';

// Convert your Express app to a serverless handler
const handler = serverless(app);

// Vercel will call this function
export default async function (req: VercelRequest, res: VercelResponse) {
  return handler(req, res);
}
