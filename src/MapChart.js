import React, { useEffect, useState, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import sortBy from "lodash/sortBy";
import "./styles.css";
// import Popup from "reactjs-popup";
// import { Popup } from "react-leaflet";
const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-continents.json";

const MapChart = ({ setContent, setNetUsage }) => {
  const [data, setData] = useState([]);
  const [maxValue, setMaxValue] = useState(0);

  const handleClick = (city, networkusage) => {
    console.log(city, networkusage);
    //setTooltipContent(city)
    setContent(city);
    setNetUsage(networkusage);
  };

  useEffect(() => {
    csv("/data.csv").then((cities) => {
      const sortedCities = sortBy(cities, (o) => -o.networkusage);
      setMaxValue(sortedCities[0].networkusage);
      setData(sortedCities);
    });
  }, []);

  const popScale = useMemo(
    () => scaleLinear().domain([0, maxValue]).range([0, 24]),
    [maxValue]
  );

  return (
    <ComposableMap projectionConfig={{ rotate: [-10, 0, 0] }}>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#DDD"
              style={{
                default: {
                  fill: "#D6D6DA",
                  outline: "none"
                }
              }}
            />
          ))
        }
      </Geographies>
      {data.map(({ city_code, city, lng, lat, networkusage }, index) => {
        return (
          <Marker
            key={city_code}
            coordinates={[lng, lat]}
            onClick={() => handleClick(city, networkusage)}
          >
            <circle
              fill={
                networkusage >= 30
                  ? "#F53"
                  : networkusage < 20
                  ? "blue"
                  : "green"
              }
              stroke="#FFF"
              r={popScale(networkusage)}
            />
          </Marker>
        );
      })}
    </ComposableMap>
  );
};
export default MapChart;
