"use client";

import submitGuestbookMessage from "@/server/submit-guestbook-message";
import SubmitGuestbookMessageButton from "../SubmitGuestbookMessageButton";

export default function GuestbookForm({
  submitted,
}: {
  submitted?: string;
}) {
  return (
    <div className="border-2 border-blue-700 bg-indigo-50 px-4 py-2">

      <form
        className="flex flex-col gap-4"
        action={submitGuestbookMessage}
      >
        <h2>Name:</h2>

        <input
          className="mx-4 p-1 w-sm border border-blue-700 bg-white rounded"
          id="username"
          name="username"
          required
          placeholder="Your name"
        />

        <h2>Message:</h2>

        <div className="flex items-end gap-2">
          <textarea
            className="mx-4 p-1 w-full border border-blue-700 bg-white h-20 rounded resize-none"
            id="message"
            name="message"
            required
            placeholder="Type your message here"
          />

          <SubmitGuestbookMessageButton />
        </div>

        {submitted && (
          <div className="mb-3 border border-blue-700 bg-blue-100 px-4 py-2 text-sm">
            Message submitted!
          </div>
        )}
      </form>
    </div>
  );
}