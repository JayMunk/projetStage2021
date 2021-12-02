import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { UserInfoContext } from "../../../contexts/UserInfo";
import CVService from "../../../services/CVService";
import "./ViewCvPdf.css";

const ViewCvPdf = ({ cv, onAccept, onReject, onCancel }) => {
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);
  const [pdfScale, setPdfScale] = useState(1);

  const onDocumentLoad = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onNextPage = () => {
    if (page >= numPages) return;
    setPage((current) => current + 1);
  };

  const onPrevPage = () => {
    if (page <= 1) return;
    setPage((current) => current - 1);
  };

  const renderPageControls = (
    <div className="container">
      <div className="row text-center justify-content-center">
        <button
          className="btn btn-primary col-1 ml-auto mr-0"
          onClick={onPrevPage}
        >
          &lt;
        </button>
        <div className="col-2 ml-0 mr-0 mt-auto mb-auto text-white">
          Page {page} of {numPages}
        </div>
        <button
          className="btn btn-primary col-1 mr-auto ml-0"
          onClick={onNextPage}
        >
          &gt;
        </button>
      </div>
    </div>
  );

  const renderControls = (
    <>
      <div className="col"></div>
      <button
        className="btn btn-secondary btn-sm col-1"
        onClick={() => setPdfScale((scale) => scale - 0.25)}
      >
        -
      </button>
      <div className="col text-center text-white mt-auto mb-auto">
        {pdfScale * 100}%
      </div>
      <button
        className="btn btn-secondary btn-sm col-1"
        onClick={() => setPdfScale((scale) => scale + 0.25)}
      >
        +
      </button>
      <button className="btn btn-danger col ml-auto mr-0" onClick={onReject}>
        Rejeter
      </button>
      <button className="btn btn-success col mr-auto ml-0" onClick={onAccept}>
        Accepter
      </button>
    </>
  );

  return (
    <div className="cvDark h-100 pb-auto mb-auto">
      {!cv ? (
        ""
      ) : (
        <div>
          <div className="container">
            <div className="row center">
              <button
                className="btn btn-secondary col ml-0 mr-auto"
                onClick={onCancel}
              >
                Annuler
              </button>
              {renderControls}
            </div>
          </div>
          <Document
            file={`data:application/pdf;base64,${cv.data}`}
            onLoadSuccess={onDocumentLoad}
          >
            <Page
              pageNumber={page}
              scale={pdfScale}
              renderAnnotationLayer={false}
            />
          </Document>
          {numPages > 1 ? renderPageControls : ""}
        </div>
      )}
    </div>
  );
};

export default ViewCvPdf;
