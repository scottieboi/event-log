"use client";

import {FormEvent} from "react";
import {useRouter} from 'next/navigation'
import {serializeSearchParams} from "@/utils/queryParams";


export default function Form() {
  const router = useRouter()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = {
      fromDate: (e.currentTarget.elements as any).dateFrom.value,
      toDate: (e.currentTarget.elements as any).dateTo.value,
      userId: (e.currentTarget.elements as any).userId.value,
      eventType: (e.currentTarget.elements as any).eventType.value,
    }

    router.replace(serializeSearchParams(params) || "/");
  };


  return (
    <form className="max-w-sm mx-auto mb-5" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label htmlFor="dateFrom" className="block mb-2 text-sm font-medium">Date
          From</label>
        <input id="dateFrom"
               className="rounded-lg block w-full p-2.5"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="dateTo" className="block mb-2 text-sm font-medium">Date To</label>
        <input id="dateTo"
               className="rounded-lg block w-full p-2.5"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="userId" className="block mb-2 text-sm font-medium">User Id</label>
        <input id="userId"
               className="rounded-lg block w-full p-2.5"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="eventType" className="block mb-2 text-sm font-medium">Event Type</label>
        <input id="eventType"
               className="rounded-lg block w-full p-2.5"
        />
      </div>
      <button type="submit"
              className="text-white bg-blue-700 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center">Submit
      </button>

    </form>
  )
}
