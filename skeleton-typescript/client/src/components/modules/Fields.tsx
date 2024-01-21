import React, { useEffect } from "react";
import MultiSelect from "./MultiSelect";
import { TagObj } from "./Tag";
import "./Fields.css";

type Props = {
  allTagOptions: TagObj[];
  activatedTags: TagObj[];
  setActivatedTags: React.Dispatch<React.SetStateAction<TagObj[]>>;
};

const Fields = (props: Props) => {
  return (
    <section className="fields-container">
      <ul className="single-field">
        <span className="field-name">Created on</span>
        <span className="field-value text-black">04/29/2002</span>
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
