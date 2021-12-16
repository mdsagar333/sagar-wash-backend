import React from "react";

const ServiceItem = ({ id, servieTitle, image, text }) => {
  return (
    <div className="col-12 col-md-3 d-flex align-items-stretch">
      <div className="card">
        <img
          src={image}
          className="card-img-top"
          alt="..."
          style={{ maxHeight: "170px" }}
        />
        <div className="card-body">
          <h5 className="card-title text-uppercase mb-4">{servieTitle}</h5>
          <p className="card-text">{text}</p>
        </div>
        <a href={`/${id}`} className="btn btn-primary">
          Learn more
        </a>
      </div>
    </div>
  );
};

export default ServiceItem;
