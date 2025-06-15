import React from "react";
import ScrollUp from "../../components/main/Common/ScrollUp";
import Hero from "../../components/main/Hero/Hero";
import Features from "../../components/main/Features/Features";
import Video from "../../components/main/Video/Video";
import Testimonials from "../../components/main/Testimonials/Testimonial";
import Brands from "../../components/main/Brands/Brands";
import About from "../../components/main/About/About";
import Blog from "../../components/main/Blog/Blog";

const Home = () => {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <Video />
      <Brands />
      <About />
      <Testimonials />
      <Blog />
    </>
  );
};

export default Home;
