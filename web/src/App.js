import React, { useEffect } from "react";
import Routes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "./services";
import localStorage from "local-storage";

export default function App() {
  const doLogin = () => {
    console.log("REALIZANDO LOGIN...");
    Axios.post("/login")
      .then(async (response) => {
        console.log(response.data);
        await localStorage.set("token", response.data.token);
        await localStorage.set("matricula", response.data.matricula);
        await localStorage.set("prefixo", response.data.prefixo);
        await localStorage.set("nome", response.data.nome);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  };

  useEffect(() => {
    doLogin();
  }, []);

  return <Routes />;
}
