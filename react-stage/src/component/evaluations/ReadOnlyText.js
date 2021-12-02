import React from "react";

const ReadOnlyText = ({ label, value }) => {
  return (
    <div className="row">
      <label className="text-white col-auto">{label}</label>
      <input className="col-8 right" type="text" value={value} readOnly />
    </div>
  );
};

export default ReadOnlyText;
