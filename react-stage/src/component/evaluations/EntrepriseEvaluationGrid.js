import React from "react";

const EntrepriseEvaluationGrid = ({ questions, handleChangeRadio }) => {
  return (
    <>
      <div className="row mb-3">
        <div className="col text-center text-white">
          <p>Totalement en accord</p>
        </div>
        <div className="col text-center text-white">
          <p>Plutôt en accord</p>
        </div>
        <div className="col text-center text-white">
          <p>Plutôt désaccord</p>
        </div>
        <div className="col text-center text-white">
          <p>Totalement désaccord</p>
        </div>
        <div className="col text-center text-white">
          <p>Impossible de se prononcer</p>
        </div>
      </div>
      {questions.map((question) => (
        <div className="row mt-3">
          <div className="text-center text-white">
            <p className="mb-0">{question.text}</p>
          </div>
          <div className="col text-center">
            <input
              type="radio"
              name={question.index}
              value={4}
              onChange={handleChangeRadio}
            />
          </div>
          <div className="col text-center">
            <input
              type="radio"
              name={question.index}
              value={3}
              onChange={handleChangeRadio}
            />
          </div>
          <div className="col text-center">
            <input
              type="radio"
              name={question.index}
              value={2}
              onChange={handleChangeRadio}
            />
          </div>
          <div className="col text-center">
            <input
              type="radio"
              name={question.index}
              value={1}
              onChange={handleChangeRadio}
            />
          </div>
          <div className="col text-center">
            <input
              type="radio"
              name={question.index}
              value={0}
              onChange={handleChangeRadio}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default EntrepriseEvaluationGrid;
