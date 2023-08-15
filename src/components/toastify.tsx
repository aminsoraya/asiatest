import React, { useEffect } from "react";
import {
  ToastContainer,
  ToastOptions,
  ToastPosition,
  toast,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EnumResponseStatus, IResponseMessage } from "../bussiness";

interface IToastifyProps {
  text: string | undefined;
}

const BaseConfiguration: ToastOptions<{}> | undefined = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

const ToastifyError = (props: IToastifyProps) => {
  useEffect(() => {
    if (props.text) toast.error(props.text, BaseConfiguration);
  }, [props]);

  return <ToastContainer />;
};

const ToastifySuccess = (props: IToastifyProps) => {
  useEffect(() => {
    if (props.text) toast.success(props.text, BaseConfiguration);
  }, [props]);

  return <ToastContainer />;
};

interface IToastify {
  responseMessage: IResponseMessage;
}

export default function Toastify(props: IToastify) {
  if (props.responseMessage.type == EnumResponseStatus.valid)
    return <ToastifySuccess text={props.responseMessage.message} />;
  else return <ToastifyError text={props.responseMessage.message} />;
}
