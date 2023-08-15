import React from "react";
import "./index.scss";
import Loading from "../loading";

interface IProps {
  callback: () => void;
  text: string;
  loading?:boolean|undefined
  width?:"small"|"large",
  disabled?:boolean
}

export default function Index(props: IProps) {
  return (
    <button className={`button ${props.disabled?"disabled":""}`}  style={{width:props.width=="large"?"100%":"fit-content"}} disabled={props.loading||props.disabled} onClick={props.callback}>
      {props.loading?<Loading/>: props.text}
    </button>
  );
}
