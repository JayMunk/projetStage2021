import React from "react";

const ReadOnlyText = ({ label, value }) => {
  return (
    <div className="row">
      <label className="text-white col-3">{label}</label>
      <input
        className="col ms-auto text-center bg-secondary text-white"
        type="text"
        value={value}
        readOnly
      />
    </div>
  );
};

export default ReadOnlyText;
