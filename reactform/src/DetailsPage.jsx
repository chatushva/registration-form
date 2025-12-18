
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function DetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const data = location.state?.formData;

  if (!data) {
    navigate("/");
    return null;
  }

  return (
    <div className="page-wrapper">
      <div className="details-container">
        <h1 className="form-title">Submitted Details</h1>

        <div className="details-grid">
          {Object.entries(data).map(([label, value]) => (
            <div className="detail-row" key={label}>
              <span className="label">{label}</span>
              <span className="value">{value}</span>
            </div>
          ))}
        </div>

        <button className="submit-btn" onClick={() => navigate("/")}>
          Back
        </button>
      </div>
    </div>
  );
}

export default DetailsPage;
