import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Hero from "./Hero/Hero";
import HowWork from "./HowWork/HowWork";
import Service from "./Service/Service";
import WhyChoose from "./WhyChoose/WhyChoose";
import { loadUserData } from "../../globalState/GlobalStateSlice";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("from useEffect");
    dispatch(loadUserData());
  }, []);
  return (
    <>
      <Hero />
      <HowWork />
      <Service />
      <WhyChoose />
    </>
  );
};

export default Home;
