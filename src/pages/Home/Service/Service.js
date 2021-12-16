import React from "react";
import ServiceItem from "./ServiceItem";
import { useSelector, useDispatch } from "react-redux";

const Service = () => {
  const { name, value, isLoading, services } = useSelector(
    (state) => state.globalState
  );
  console.log(name, value, isLoading);
  return (
    <div className="my-5">
      <div className="container">
        <h1 className="text-center my-4">Our Services</h1>
        <div className="row">
          {services.map((item) => (
            <ServiceItem key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;

// https://ibb.co/wYf8gK0
// https://ibb.co/hf0yCtX
// https://ibb.co/vPvZ98L
// https://ibb.co/pxsMbBy
