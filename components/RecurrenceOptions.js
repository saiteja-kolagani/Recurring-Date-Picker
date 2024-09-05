"use client";

import React, { useState, useEffect } from 'react';

export default function RecurrenceOptions({ setRecurrence }) {
  const [pattern, setPattern] = useState('daily');
  const [interval, setInterval] = useState(1);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [previewDate, setPreviewDate] = useState(new Date());

  const dayMap = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  const handlePatternChange = (e) => {
    const newPattern = e.target.value;
    setPattern(newPattern);
    setRecurrence((prev) => ({ ...prev, pattern: newPattern }));

    if (newPattern !== 'weekly') {
      setDaysOfWeek([]);
      setRecurrence((prev) => ({ ...prev, daysOfWeek: [] }));
    }
  };

  const handleIntervalChange = (e) => {
    const value = e.target.value;
    const newInterval = value === '' ? '' : Math.max(1, parseInt(value, 10));

    setInterval(newInterval);
    setRecurrence((prev) => ({ ...prev, interval: newInterval || 1 }));
  };

  const handleDayOfWeekChange = (day) => {
    const updatedDays = daysOfWeek.includes(day)
      ? daysOfWeek.filter((d) => d !== day)
      : [...daysOfWeek, day];

    setDaysOfWeek(updatedDays);
    setRecurrence((prev) => ({ ...prev, daysOfWeek: updatedDays }));
  };

  useEffect(() => {
    if (daysOfWeek.length > 0) {
      const today = new Date();
      const selectedDayIndex = dayMap[daysOfWeek[0]];

      const nextDate = new Date();
      nextDate.setDate(
        today.getDate() + ((selectedDayIndex - today.getDay() + 7) % 7)
      );

      setPreviewDate(nextDate);
    }
  }, [daysOfWeek]);

  return (
    <div>
      <label htmlFor="pattern" className="block mb-2">Recurrence Pattern</label>
      <select
        id="pattern"
        value={pattern}
        onChange={handlePatternChange}
        className="p-2 border mb-4 w-full"
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>

      <label htmlFor="interval" className="block mb-2">Interval</label>
      <input
        id="interval"
        type="number"
        min="1"
        value={interval}
        onChange={handleIntervalChange}
        className="p-2 border mb-4 w-full"
      />
      <p className="text-sm text-gray-500 mb-4">
        {pattern === 'daily' && 'Repeat every X days'}
        {pattern === 'weekly' && 'Repeat every X weeks'}
        {pattern === 'monthly' && 'Repeat every X months'}
        {pattern === 'yearly' && 'Repeat every X years'}
      </p>

      {pattern === 'weekly' && (
        <div>
          <p>Select Days of the Week:</p>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <label key={day} className="inline-flex items-center mr-2">
              <input
                type="checkbox"
                checked={daysOfWeek.includes(day)}
                onChange={() => handleDayOfWeekChange(day)}
                className="form-checkbox"
              />
              <span className="ml-1">{day}</span>
            </label>
          ))}
        </div>
      )}

      {pattern === 'weekly' && daysOfWeek.length > 0 && (
        <div className="mt-4">
          <h3>Preview Calendar Start Date:</h3>
          <p>{previewDate.toDateString()}</p>
        </div>
      )}
    </div>
  );
}
