import React from "react";
import MultiSelect from "./MultiSelect";
import "./Fields.css";

const Fields = () => {
  return (
    <section className="fields-container">
      <ul className="single-field">
        <span className="field-name">Created on</span>
        <span className="field-value text-black">04/29/2002</span>
      </ul>
      <ul className="single-field">
        <span className="field-name">Tags</span>
        <MultiSelect />
      </ul>
    </section>
  );
};

export default Fields;
