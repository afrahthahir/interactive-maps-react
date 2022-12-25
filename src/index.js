import React, { useState } from "react";

import "./styles.css";

import MapChart from "./MapChart";
import ReactDOM from "react-dom/client";

export default function App() {
  const [content, setContent] = useState("");
  const [netusage, setNetUsage] = useState("");

  return (
    <>
      <h1>Scroll down to know more</h1>
      <MapChart setContent={setContent} setNetUsage={setNetUsage} />
      <h1>
        Click on the marker to know the city and its networkusage percentage
      </h1>
      <h2>CITY:{content}</h2>
      <h3>NETWORK USAGE:{netusage}</h3>
      <section className="colors">
        <article className="one">
          <div class="circleg"></div>
          <p> greater than 20 </p>
        </article>

        <article className="two">
          <div class="circleb"></div>
          <p> lesser than 20 </p>
        </article>
        <article className="three">
          <div class="circleo"></div>
          <p> greater than or equal to 30 </p>
        </article>
      </section>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
