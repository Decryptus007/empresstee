import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="py-10 bg-emerald-300">
      <h1 className="text-3xl font-bold text-center text-slate-900 mt-20">
        About Page
      </h1>
      <nav>
        <Link to="/"><span className="text-center text-sm text-sky-900">Home</span></Link>
      </nav>
    </section>
  );
};

export default About;
