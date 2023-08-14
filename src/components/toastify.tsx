import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IToastifyProps {
  text: string | undefined;
}

export const ToastifyError = (props: IToastifyProps) => {
  useEffect(() => {
    if (props.text)
      toast.error(props.text, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
  }, [props]);

  return <ToastContainer />;
};
