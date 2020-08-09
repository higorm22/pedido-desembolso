import React, { useEffect } from "react";
import Routes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "./services";
import localStorage from "local-storage";



export default function App() {
  const doLogin = () => {


    console.log("Rodando doLogin");

    Axios.post("/login") 
      .then(async (response) => {
        await localStorage.set("token", response.data.token);
        await localStorage.set("matricula", response.data.matricula);
        await localStorage.set("prefixo", response.data.prefixo);
        await localStorage.set("nome", response.data.nome);
      })
      .catch((error) => {
        if (error.response) {
          console.error(error);
        }
      });
  };

  useEffect(() => {
    doLogin();
  }, []);

  return <Routes />;
}
