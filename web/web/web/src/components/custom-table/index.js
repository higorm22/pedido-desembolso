import React, { useState, useEffect } from "react";
import ls from "local-storage";

import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import "./styles.css";

import {  formatNumber } from "../../util/format";
import Axios from "../../services";


const CustomTable = ({ pedidos, tipo }) => {

  const [status, setStatus] = useState({ type: "", message: "" });
  const [pedidoss, setPedidoss] = useState([]);

  const loadPedidos = async () => {
    const token = "Bearer " + ls.get("token");

    Axios.get("/pedidos", {
      Authorization: token,
    })
      .then((response) => {
        setPedidoss(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  async function handleDelete(id){

    console.log(id);

    const token = "Bearer " + ls.get("token");
    await Axios.delete("/pedidos", {
      Authorization: token,
      data: { id: id }
    })
      .then((response) => {
        loadPedidos();
        setStatus({ type: "success", message: response.data.message });
      })
      .catch((error) => {
        console.error(error);
        setStatus({ type: "danger", message: error.response.data.message });
      });
  };

  useEffect(() => {
    loadPedidos();
  }, []);
  return (
    <Table bordered hover  responsive="md">
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Proposta</th>
          <th>Linha Crédito</th>
          <th>Valor</th>
          <th>Município</th>
          {tipo === "PRORROGADO" ? null : <th>Acões</th>}
        </tr>
      </thead>
      <tbody>
        {pedidos.length > 0 ? (
          pedidos.map((pedido, index) => {
            return (
              <tr
                key={index}
                style={{
                  display: pedido.status === tipo ? "table-row" : "none",
                }}
              >
                <td>{pedido.cliente}</td>
                <td>{pedido.nr_proposta}</td>
                <td>{pedido.linha_credito}</td>
                <td>{formatNumber(pedido.valor)}</td>
                <td>{pedido.municipio}</td>
                {tipo === "PRORROGADO" ? null : tipo ===
                  "AUTORIZADO" ? (
                  <td>
                    <Link to={{ pathname: `/prorrogacao-pedido/` + pedido.id }}>
                      <Button variant="primary" size="sm">
                        Prorrogação
                      </Button>
                    </Link>
                  </td>
                ) : (
                  <td>
                    <button type="button" onClick={() => handleDelete(pedido.id)}>
                      <FaTrashAlt />
                    </button>
                  </td>
                )}
              </tr>
            );
          })
        ) : (
          <tr>
            <td>Nenhum pedido encontrado para sua agência.</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default CustomTable;
