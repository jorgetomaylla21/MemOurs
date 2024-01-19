import React from "react";
import "./Editor.css";

type Props = {
  fieldName: string;
  fieldValue: string;
  isEmpty: boolean;
};

/**
 * Field is a component for displaying user defined values
 *
 * Proptypes
 * @param {string} fieldName
 * @param {string} fieldValue
 * @param {boolaen} isEmpty
 */
const Field: React.FC<Props> = (props: Props) => {
  return (
    <ul className="u-center">
      <div className="field-container">
        <div className="field-shape field-name">{props.fieldName}</div>
        {props.isEmpty ? (
          <div className="field-shape field-value">Empty</div>
        ) : (
          <div className="field-shape field-value-activated">{props.fieldValue}</div>
        )}
      </div>
    </ul>
  );
};

export default Field;
