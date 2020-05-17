import React from "react";
import {  Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const CustomTable = ({ pedidos, tipo, prorrogacao }) => {
  return (
    <Table striped bordered hover>
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
                  display: pedido.status === tipo ? "contents" : "none",
                }}
              >
                <td>{pedido.cliente}</td>
                <td>{pedido.nr_proposta}</td>
                <td>{pedido.valor}</td>
                <td>{pedido.status}</td>
                <td>{pedido.municipio}</td>
                {tipo === "ESPERA" && prorrogacao ? null : (
                  <td>
                    <Link to={{ pathname: `/prorrogacao-pedido/` + pedido.id }}>
                      <FaSearch />
                    </Link>
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
