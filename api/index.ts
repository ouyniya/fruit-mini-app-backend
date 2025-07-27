import { VercelRequest, VercelResponse } from "@vercel/node";
import { app } from "../src/app";
import serverlessExpress from "@vendia/serverless-express";

const handler = serverlessExpress({ app });

export default (req: VercelRequest, res: VercelResponse) => {
  return handler(req, res);
};
