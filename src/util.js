import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

export const color = {
  cases:{
    background: "rgb(25,103,210, 0.3)",
    border: "rgb(25,103,210)",
    multiplier: 80
  },
  recovered:{
    background: "rgb(40,167,69, 0.3)",
    border: "rgb(40,167,69)",
    multiplier: 80
  },
  deaths:{
    background: "rgb(255,33,79, 0.3)",
    border: "rgb(255,33,79)",
    multiplier: 2
  }
}

export const sortData = (data) => {
  let sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const showDataOnMap = (data, casesType = "cases", all) =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={color[casesType].border}
      fillColor={color[casesType].background}
      fillOpacity={1}
      radius={
        Math.sqrt((country[casesType]) * all[casesType])/color[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));


 