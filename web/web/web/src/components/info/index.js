import React from "react";

import {
    Row,
    Col,
  } from "react-bootstrap";

const informacoes = () =>{
    return(
        <Col>
        <Row>
          <h4>BB Custeio e PRONAMP Custeio</h4>
        </Row>
        <Row className="text-justify">
          <p>
            A fonte de recurso para as linhas BB Custeio e PRONAMP Custeio foi
            alterada.
          </p>
          <p>Para mais informações, consultar a IN 607-1 item 2.3.3</p>
        </Row>
        <p>&nbsp;</p>
        <Row>
          <h4>Prorrogação FCO Rural</h4>
        </Row>
        <Row className="text-justify">
          <p>
            Para as propostas com a fonte de recurso FCO, somente é permitida a
            solicitação de prorogação de prazo para datas dentro do mês vigente
            da proposta. Para solicitar um prazo superior ao permitido pela
            Super GO, você deve cadastrar um novo pedido com os mesmos dados do
            anterior. Isso é feito da seguinte maneira:
          </p>
          <ul>
            <li>
              Clique no botão Prorrogação (verde) ao lado do pedido autorizado.
              Você será redirecionado à página de pedidos de prorrogação.
            </li>
            <li>
              <strong>Não preencha o formulário na página.</strong>
              Apenas clique no botão laranja "Prorrogação FCO".
            </li>
          </ul>
          <p>
            Ao clicar no botão laranja, o pedido autorizado será automaticamente
            classificado como VENCIDO, e um novo pedido com os dados do anterior
            e referente à  mesma proposta ficará em análise na Super GO.
          </p>
        </Row>
      </Col>
    );
};

export default informacoes;