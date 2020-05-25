import React from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import "./styles.css";

const CustomTable = ({ pedidos, tipo, prorrogacao }) => {
  return (
    <Table bordered hover  responsive="md">
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Proposta</th>
          <th>Valor</th>
          <th>Status</th>
          <th>Município</th>
          {tipo === "ESPERA" && prorrogacao ? null : <th>Acões</th>}
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
                <td>{pedido.valor}</td>
                <td>{pedido.status}</td>
                <td>{pedido.municipio}</td>
                {tipo === "ESPERA" && pedido.prorrogado ? null : tipo ===
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
