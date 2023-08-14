import React from "react";
import "./index.scss";
import Loading from "../loading";

interface IProps {
  callback: () => void;
  text: string;
  loading?:boolean|undefined
}

export default function Index(props: IProps) {
  return (
    <button className="button" disabled={props.loading} onClick={props.callback}>
      {props.loading?<Loading/>: props.text}
    </button>
  );
}
