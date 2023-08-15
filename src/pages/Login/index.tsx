import React, { useState } from "react";
import styles from "./index.module.scss";
import useAxios from "../../api/index";
import Toastify from "../../components/Toastify";
import {
  EnumResponseStatus,
  IApiResponse,
  IResponseMessage,
} from "../../bussiness/index";
import Button from "../../components/button";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [responseMessage, setResponseMessage] = useState<
    IResponseMessage | undefined
  >();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const canSave = username && password;
  const axios = useAxios({ appendToken: true });

  const login = async () => {
    if (canSave) {
      setLoading(true);

      //request
      let { message, status, data }: IApiResponse = await axios
        .post("Account/Login", { username, password })
        .then(({ data }) => data);

      //handle responses
      if (status == EnumResponseStatus.invalid) {
        setResponseMessage({ message, type: EnumResponseStatus.invalid });

        //message should kill once it used
        setTimeout(() => {
          setResponseMessage(undefined);
        }, 5000);
      } else if (status == EnumResponseStatus.valid) {
        //set token to localstorage
        localStorage.setItem("asia_token", data.userToken!);

        //navigate to private page
        navigate("/Vehicle", { replace: true });
      }
      setLoading(false);
    }
  };

  return (
    <>
      <main className={styles.main}>
        <div className={styles.login}>
          <div className={styles.header}>
            <span>ورود</span>
          </div>
          <div className={styles.body}>
            <div className={styles.input_row}>
              <label>نام کاربری</label>
              <input
                type="text"
                onChange={(event) => setUsername(event.target.value)}
                value={username}
              />
            </div>
            <div className={styles.input_row}>
              <label>کلمه عبور</label>
              <input
                type="password"
                onChange={(event) => setPassword(event.currentTarget.value)}
                value={password}
              />
            </div>
            <div className={styles.input_row}>
              <Button
                loading={loading}
                width="large"
                callback={() => login()}
                text="ورود"
              />
            </div>
          </div>
        </div>
      </main>
      <Toastify responseMessage={responseMessage!} />
    </>
  );
}
