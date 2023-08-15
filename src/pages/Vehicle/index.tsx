import React, { useMemo, useState } from "react";
import Map from "../../components/Map";
import L from "leaflet";
import fromMarkerIcon from "./fromMarkerIcon.png";
import toMarkerIcon from "./toMarkerIcon.png";
import toIcon from "./toIcon.png";
import fromIcon from "./fromIcon.png";
import searchIcon from "./search.png";
import { locationType } from "../../components/Map";
import "./index.scss";
import { ConvertEnNumToPe } from "../../bussiness/index";
import Button from "../../components/button";

const toMarker = new L.Icon({
  iconUrl: toMarkerIcon,
  iconSize: new L.Point(50, 50),
  popupAnchor: [0, 0],
  iconAnchor: [25, 50],
});

const fromMarker = new L.Icon({
  iconUrl: fromMarkerIcon,
  iconSize: new L.Point(50, 50),
  popupAnchor: [0, 0],
  iconAnchor: [25, 50],
});

export default function Vehicle() {
  const defaultLocation = { lat: 29.9135788539514, lng: 52.862520217895515 };

  const [markers, setMarkers] = useState<
    { lat: number; lng: number; icon: any; title: string }[] | undefined
  >();

  const setLocation = ({ lat, lng }: locationType) => {
    if (markers?.length == 2) {
      setMarkers(undefined);
    }
    setMarkers((state) =>
      !state
        ? [{ lat, lng, icon: fromMarker, title: "مبدا" }]
        : [...state, { lat, lng, icon: toMarker, title: "مقصد" }]
    );
  };

  const [from, to] = useMemo(() => {
    return markers! ?? [];
  }, [markers]);

  return (
    <div className="main">
      <Map
        callback={setLocation}
        defaultLocation={defaultLocation}
        markers={markers!}
      />
      <div className="form">
        <div className="rowFrom">
          <img src={fromIcon} width={30} />
          <span className="title">مبدا :</span>
          {from ? (
            <span>
              {ConvertEnNumToPe(from.lng)},{ConvertEnNumToPe(from.lat)}
            </span>
          ) : (
            <span>
              ---------------------------------------------------------
            </span>
          )}
        </div>
        <div className="rowTo">
          <img src={toIcon} width={30} />
          <span className="title">مقصد :</span>
          {to ? (
            <span>
              {ConvertEnNumToPe(to.lng)},{ConvertEnNumToPe(to.lat)}
            </span>
          ) : (
            <span>
              ---------------------------------------------------------
            </span>
          )}
        </div>
        <div className="row">
          <input type="text" placeholder="نوع ماشین آلات" />
          <img src={searchIcon} />
        </div>
        <div className="row marginTop">
          <Button text="ثبت درخواست" width="large" callback={() => {}} loading={false}  />
        </div>
      </div>
    </div>
  );
}
