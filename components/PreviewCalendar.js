"use client";

import React, { format, isValid, addDays, addWeeks, addMonths, addYears } from 'date-fns';

export default function PreviewCalendar({ recurrence }) {
  const { pattern, interval, daysOfWeek, startDate } = recurrence;
  const recurringDates = calculateRecurringDates(pattern, interval, daysOfWeek, startDate);

  return (
    <div className="mt-4">
      <h3 className="text-lg">Preview:</h3>
      <div className="grid grid-cols-7 gap-2 mt-2">
        {recurringDates.map((date, index) => {
          const validDate = new Date(date);

          const dateFormat = pattern === 'yearly' ? 'MMM d, yyyy' : 'MMM d';

          return isValid(validDate) ? (
            <div key={index} className="p-2 border rounded">
              {format(validDate, dateFormat)}
            </div>
          ) : (
            <div key={index} className="p-2 border rounded text-red-500">
              Invalid Date
            </div>
          );
        })}
      </div>
    </div>
  );
}

function calculateRecurringDates(pattern, interval, daysOfWeek, startDate) {
  const dates = [];
  let currentDate = new Date(startDate);

  if (!isValid(currentDate)) return dates;

  for (let i = 0; i < 10; i++) {
    if (pattern === 'daily') {
      currentDate = addDays(currentDate, interval);
    } else if (pattern === 'weekly') {
      currentDate = addWeeks(currentDate, interval);
    } else if (pattern === 'monthly') {
      currentDate = addMonths(currentDate, interval);
    } else if (pattern === 'yearly') {
      currentDate = addYears(currentDate, interval);
    }

    dates.push(currentDate);
  }

  return dates;
}
