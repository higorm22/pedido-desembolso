import React from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import "./styles.css";

import {  formatNumber } from "../../util/format";

const CustomTable = ({ pedidos, tipo }) => {
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
                      <FaTrashAlt />
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
