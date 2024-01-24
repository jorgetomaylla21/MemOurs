import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MultiSelect from "./MultiSelect";
import "./Fields.css";

import { TagOption } from "./TagOption";

type Props = {
  allTagOptions: TagOption[];
  activatedTags: TagOption[];
  setActivatedTags: React.Dispatch<React.SetStateAction<TagOption[]>>;
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
};

const Fields = (props: Props) => {
  return (
    <section className="fields-container">
      <ul className="single-field">
        <span className="field-name">Date</span>
        <div className="rounded-md hover:bg-slate-100">
          <DatePicker
            selected={props.selectedDate}
            onChange={props.setSelectedDate}
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
