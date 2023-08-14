import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import Map from "../../components/Map";
import L from "leaflet";
import first from "./first.png";
import second from "./second.png";
import { locationType } from "../../components/Map";

const toMarker = new L.Icon({
  iconUrl: first,
  iconSize: new L.Point(50, 50),
  popupAnchor: [0, 0],
  iconAnchor: [25, 50],
});

const fromMarker = new L.Icon({
  iconUrl: second,
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

  return (
    <>
      <Map
        callback={setLocation}
        defaultLocation={defaultLocation}
        markers={markers!}
      />
    </>
  );
}
