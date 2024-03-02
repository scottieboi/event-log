import {Event, LogParams} from "../routes";
import {z} from "zod";

function parseLine(line: string, filter: LogParams): Event | null {
  const parts = line.split(" ");
  if (parts.length !== 6) {
    return null;
  }

  let dateSchema = z.date();
  let eventTypeSchema = z.string();
  let userIdSchema = z.number().int();
  if (filter.fromDate && filter.toDate) {
    dateSchema = z.date().min(new Date(filter.fromDate + "Z")).max(new Date(filter.toDate + "T23:59:59Z"));
  } else if (filter.fromDate) {
    dateSchema = z.date().min(new Date(filter.fromDate + "Z"));
  } else if (filter.toDate) {
    dateSchema = z.date().max(new Date(filter.toDate + "T23:59:59Z"));
  }

  if (filter.eventType) {
    eventTypeSchema = z.string().includes(filter.eventType);
  }

  if (filter.userId && Number.parseInt(filter.userId)) {
    userIdSchema = z.number().min(Number.parseInt(filter.userId)).max(Number.parseInt(filter.userId));
  }

  const eventSchema = z.object({
    timestamp: dateSchema,
    eventType: eventTypeSchema,
    originalLine: z.string(),
    userId: userIdSchema,
  })

  const event = eventSchema.safeParse({
    timestamp: new Date(parts[0] + "Z"), // assumption: dates are UTC time
    eventType: parts[5],
    originalLine: line,
    userId: Number.parseInt(parts[3]),
  });

  if (event.success) {
    return event.data;
  }

  return null;
}

export function parseLog(log: string, filter: LogParams): Event[] {
  const lines = log.split("\n");
  const parsedLines = lines.reduce((acc, line) => {
    const event = parseLine(line, filter);
    if (event) {
      acc.push(event);
    }

    return acc;
  }, [] as Event[]);

  return parsedLines.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
}