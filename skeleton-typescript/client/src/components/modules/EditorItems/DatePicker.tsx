// MyDatePicker.tsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MyDatePicker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null): void => {
    setSelectedDate(date);
  };

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        maxDate={new Date()}
        placeholderText="Date"
        className="font-mono focus:outline-cyan-900"
      />
    </div>
  );
};

export default MyDatePicker;
