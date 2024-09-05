"use client";

import React, { useState } from 'react';
import RecurrenceOptions from './RecurrenceOptions';
import PreviewCalendar from './PreviewCalendar';

export default function DatePicker() {
  const [recurrence, setRecurrence] = useState({
    pattern: 'daily',
    interval: 1,
    daysOfWeek: [],
    startDate: new Date(),
  });

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow-md">
      <h2 className="text-xl mb-4">Select Recurring Dates</h2>
      <RecurrenceOptions setRecurrence={setRecurrence} />
      <PreviewCalendar recurrence={recurrence} />
    </div>
  );
}
