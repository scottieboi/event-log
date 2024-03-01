

## 1. Description

This a simple application to extract and display event logs. It consists of two applications:

- `backend`: A Node.js server with a single endpoint to read and parse a log file into a JSON array and filter the result based on some search variables.

- `frontend`: A Next.js client application to collect the search variables through a form, fetch the events from the `backend`, and display the result.

## 2. `backend` tasks

- [ ] Update the `GET /events/log` endpoint implementation as described below.
- [ ] Update the test cases.

### 2.1. Details

- Read the event log file from `./backend/data/events.log`.
- Parse the file content into an array of events with the following shape:

  ```ts
  type Event = {
    timestamp: Date;
    userId: number;
    eventType: string;
    originalLine: string;
  };
  ```

- Get the search variables,`fromDate`, `toDate`, `eventType`, and `userId` from query params and filter the events based on the following rules:

  - `userId`: return the events with the matching `userId`.
  - `eventType`: return the events with the matching `eventType`.
  - `fromDate` and `toDate`: filter the events based on the date range.
  - all the search variables are optional.

- Sort the result based on the `timestamp` in descending order and return the events.
- Update/Add the test case(s) to assert one or two scenarios.

## 3. `frontend` tasks

- [ ] Add a simple form to collect search variables.
- [ ] Fetch the events from the `backend`.
- [ ] Display the result.

### 3.1. Details

- Do a simple validation on the form inputs.
- Note that all the search variables are optional.
- `tailwindcss` is just added for convenience, feel free to do the styling as you like.

## 4. How to send the solution

1. Clone this repository.
2. Push it to your own public repository.
3. Implement the solution in steps and make meaningful commits.
4. Share the repository link with us.

This is not supposed to be an extensive task, so don't spend too much time on it. We are looking for a simple and clean solution.
