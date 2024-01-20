// MyDatePicker.tsx
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MyDatePicker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null): void => {
    setSelectedDate(date);
  };

  return (
    <div>
      <h1>Enter a date: </h1>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MMMM d, yyyy"
        isClearable
        placeholderText="Select a date"
      />
      <p>Fetching any memory entries from the selected date {selectedDate?.toLocaleDateString()}. </p>
    </div>
  );
};

export default MyDatePicker;
