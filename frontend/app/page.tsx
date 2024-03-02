import Form from "@/components/Form";
import {serializeSearchParams} from "@/utils/queryParams";

type EventLog = {
  timestamp: string;
  userId: number;
  eventType: string;
  originalLine: string;
};

export const dynamic = 'force-dynamic'

export default async function Home({
                                     searchParams
                                   }: {
  searchParams: { [_key: string]: string | undefined }
}) {
  const serializedSearchParams = serializeSearchParams(searchParams);

  const logs = await fetch(
    "http://localhost:3030/events/log" + serializedSearchParams)
    .then(data => data.json()) as EventLog[];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Form/>
      <table className="w-full text-left">
        <thead>
        <tr>
          <th scope="col">timestamp</th>
          <th scope="col">user id</th>
          <th scope="col">event type</th>
          <th scope="col">original line</th>
        </tr>
        </thead>
        <tbody>
        {logs.map(l => {
          return (
            <tr key={l.timestamp + l.userId}>
              <td>{l.timestamp}</td>
              <td>{l.userId}</td>
              <td>{l.eventType}</td>
              <td>{l.originalLine}</td>
            </tr>
          )
        })}

        </tbody>
      </table>
    </main>
  );
}
