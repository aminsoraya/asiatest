import React from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

export type locationType = {
  lat: number;
  lng: number;
};
interface IMapProps {
  defaultLocation: locationType;
  markers: (locationType & { icon: any } & { title: string })[];
  callback: (values: locationType) => void;
}

export default function Map(props: IMapProps) {
  const LocationFinderDummy = () => {
    useMapEvents({
      click(e) {
        let { lat, lng } = e.latlng;
        props.callback({ lat, lng });
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={props.defaultLocation}
      zoom={16}
      scrollWheelZoom={false}
      style={{ width: "100vw", height: "100vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {props.markers?.map((item, index) => {
        return (
          <Marker
            key={index}
            position={{ lat: item?.lat!, lng: item!.lng }}
            icon={item?.icon}
          >
            <Popup>{item!.title}</Popup>
          </Marker>
        );
      })}
      <LocationFinderDummy />
    </MapContainer>
  );
}
