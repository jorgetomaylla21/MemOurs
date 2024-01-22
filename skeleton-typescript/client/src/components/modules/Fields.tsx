import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MultiSelect from "./MultiSelect";
import { TagObj } from "./Tag";
import "./Fields.css";

type Props = {
  allTagOptions: TagObj[];
  activatedTags: TagObj[];
  setActivatedTags: React.Dispatch<React.SetStateAction<TagObj[]>>;
};

const Fields = (props: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null): void => {
    setSelectedDate(date);
  };

  return (
    <section className="fields-container">
      <ul className="single-field">
        <span className="field-name">Created on</span>
        <div className="rounded-md hover:bg-slate-100">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            maxDate={new Date()}
            placeholderText="MM/DD/YYYY"
            className="field-value focus:outline-slate-400 bg-transparent z-50"
          />
        </div>
      </ul>
      <ul className="single-field">
        <span className="field-name">Tags</span>
        <MultiSelect
          allTagOptions={props.allTagOptions}
          activatedTags={props.activatedTags}
          setActivatedTags={props.setActivatedTags}
        />
      </ul>
    </section>
  );
};

export default Fields;
