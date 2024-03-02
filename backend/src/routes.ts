import express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import {z} from "zod";
import {parseLog} from "./log";

export type Event = {
  timestamp: Date;
  userId: number;
  eventType: string;
  originalLine: string;
};

const LogParams = z.object({
  fromDate: z.string().optional(),
  toDate: z.string().optional(),
  eventType: z.string().optional(),
  userId: z.string().optional(),
});

export type LogParams = z.infer<typeof LogParams>;

const router = express.Router();

router.get('/log', async (req, res) => {
  const queryParams = LogParams.parse(req.query);

  const logFilePath = path.join(__dirname, '../data/events.log');

  fs.readFile(logFilePath, {encoding: "utf8"}, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({
        message: "Cannot read file",
        error: err,
      });
      return;
    }

    const events = parseLog(data, queryParams);

    res.json(events);
  });
});

export default router;
