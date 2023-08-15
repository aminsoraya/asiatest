import React, { useEffect, useMemo, useState } from "react";
import Map from "../../components/Map";
import L from "leaflet";
import fromMarkerIcon from "./fromMarkerIcon.png";
import toMarkerIcon from "./toMarkerIcon.png";
import toIcon from "./toIcon.png";
import fromIcon from "./fromIcon.png";
import searchIcon from "./search.png";
import { locationType } from "../../components/Map";
import "./index.scss";
import {
  ConvertEnNumToPe,
  EnumResponseStatus,
  IApiResponse,
  IResponseMessage,
  IVehicle,
} from "../../bussiness/index";
import Button from "../../components/button";
import useAxios from "../../api/index";
import VehicleDetails from "./detail";
import Toastify from "../../components/Toastify";

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
  const axios = useAxios({ appendToken: true });
  const [markers, setMarkers] = useState<
    { lat: number; lng: number; icon: any; title: string }[] | undefined
  >();
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const [responseMessage, setResponseMessage] = useState<
    IResponseMessage | undefined
  >();
  const [vehicles, setVehicles] = useState<IVehicle[] | undefined>();
  const [selectedVehicleId, setSelectedVehicleId] = useState<
    number | undefined
  >();
  const [loading, setLoading] = useState<boolean>(false);

  //set markers thich its callback
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

  //return source and destination locations
  const [from, to] = useMemo(() => {
    return markers! ?? [];
  }, [markers]);

  //fetch vehicles
  useEffect(() => {
    if (searchTerm && searchTerm.length >= 2)
      (async () => {
        let { data, message, status }: IApiResponse = await axios
          .get(`Request/GetVehicleUsers?SearchTerm=${searchTerm}`)
          .then(({ data }) => data);

        if (status == EnumResponseStatus.valid && data.length == 0) {
          setVehicles(undefined);
        } else if (status == EnumResponseStatus.valid && data.length > 0) {
          setVehicles(data);
        }
      })();
  }, [searchTerm]);

  //send
  const sendRequest = async () => {
    setLoading(true);
    let { data, message, status }: IApiResponse = await axios
      .post("Request/SendRequest", {
        vehicleUserTypeId: selectedVehicleId ?? 0,
        source: `${from.lat},${from.lng}`,
        destination: `${to.lat},${to.lng}`,
      })
      .then(({ data }) => data)
      .finally(() => setLoading(false));
    if (status == EnumResponseStatus.valid) {
      setResponseMessage({ type: status, message });
    }
  };

  //clear message after elapsed sometime
  useEffect(() => {
    if (responseMessage) {
      setTimeout(() => {
        setResponseMessage(undefined);
      }, 3000);
    }
  }, [setResponseMessage, responseMessage]);

  //prevent send request
  const canBeSave = from && to;

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
        {vehicles && (
          <VehicleDetails
            callback={(id) => setSelectedVehicleId(id)}
            selectedId={selectedVehicleId}
            vehicles={vehicles}
          />
        )}
        <div className="row marginTop">
          <input
            type="text"
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="نوع ماشین آلات"
          />
          <img src={searchIcon} />
        </div>

        <div className="row marginTop">
          <Button
            text="ثبت درخواست"
            width="large"
            callback={sendRequest}
            loading={loading}
            disabled={!canBeSave}
          />
        </div>
      </div>
      {<Toastify responseMessage={responseMessage!} />}
    </div>
  );
}
