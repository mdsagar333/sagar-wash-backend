import React from "react";
import icon1 from "../../../assets/images/img_icon_01.png";
import icon2 from "../../../assets/images/img_icon_02.png";
import icon3 from "../../../assets/images/img_icon_03.png";
import icon4 from "../../../assets/images/img_icon_04.png";

const HowWork = () => {
  return (
    <div className="container-fluid mt-5">
      <h1 className="mb-5 fw-bold text-center">
        How It Works: in 4 Easy Steps
      </h1>
      <div className="row g-4">
        <div className="col-12 col-md-3 text-center">
          <img src={icon1} alt="" className="mb-4" />
          <h6>Step 1</h6>
          <h3 className="fw-bold">
            {" "}
            <span style={{ color: "dodgerblue" }}> Bag up</span> all your dirty
            clothes
          </h3>
        </div>
        <div className="col-12 col-md-3 text-center">
          <img src={icon2} alt="" className="mb-4" />
          <h6>Step 2</h6>
          <h3 className="fw-bold">
            We <span style={{ color: "dodgerblue" }}>pick up</span> your clothes
          </h3>
        </div>
        <div className="col-12 col-md-3 text-center">
          <img src={icon3} alt="" className="mb-4" />
          <h6>Step 3</h6>
          <h3 className="fw-bold">
            We <span style={{ color: "dodgerblue" }}>clean</span> your clothes
          </h3>
        </div>
        <div className="col-12 col-md-3 text-center">
          <img src={icon4} alt="" className="mb-4" />
          <h6>Step 4</h6>
          <h3 className="fw-bold">
            We <span style={{ color: "dodgerblue" }}>deliver</span> clean,
            folded clothes
          </h3>
        </div>
      </div>
    </div>
  );
};

export default HowWork;
