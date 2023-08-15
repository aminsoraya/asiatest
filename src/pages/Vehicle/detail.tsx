import { IVehicle } from "@/src/bussiness";
import React from "react";

interface IProps {
  vehicles: IVehicle[];
  selectedId: number | undefined;
  callback: (id: number) => void;
}
export default function VehicleDetails(props: IProps) {
  return (
    <div className="row marginTop">
      <span className="title">دستگاه ها :</span>
      {props.vehicles?.map((item, index) => {
        return (
          <div
            key={index}
            className="vehicles_options"
            style={{ marginRight: index > 0 ? 5 : 0 }}
            onClick={() => props.callback(item.id)}
          >
            <input
              type="radio"
              name="radio"
              value={item.id}
              checked={
                props.selectedId != undefined
                  ? props.selectedId == item.id
                  : index == 0
              }
              id={index.toString()}
            />
            <label htmlFor={index.toString()}>{item.name}</label>
          </div>
        );
      })}
    </div>
  );
}
