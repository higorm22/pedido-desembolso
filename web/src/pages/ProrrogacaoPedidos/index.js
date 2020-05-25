import React, { useEffect, useState } from "react";
import {
  Button,
  Row,
  Container,
  Col,
  Form,
  Nav,
  Navbar,
  Image,
  Alert,
} from "react-bootstrap";

import { Link } from "react-router-dom";

import {
  formatAmericanToBrazillianDateAndTime,
  formatNumber,
} from "../../util/format";

import logo from "../../assets/images/logo.png";

import Axios from "../../services";

import ls from "local-storage";

const ProrrogacaoPedido = ({ match }) => {
  const INITIAL_STATE = {
    novo_prazo: new Date(),
    motivo: "",
  };
  const [pedido, setPedido] = useState({});
  const [message, setMessage] = useState({});
  const [messageFco, setMessageFco] = useState({});
  const [pedidoAlterado, setPedidoAlterado] = useState(INITIAL_STATE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = "Bearer " + ls.get("token");

    await Axios.post("/alteracoes", pedidoAlterado, {
      Authorization: token,
    })
      .then((response) => {
        setPedido({ ...pedido, prorrogado: true, status: "ESPERA" });

        Axios.put(`/pedidos/${pedido.id}`, pedido, {
          Authorization: token,
        });

        setMessage({ type: "success", message: response.data.message });
      })
      .catch((error) => {
        setMessage({ type: "danger", message: error.response.data.message });
      });
  };

  const handleSubmitFco = async () => {
    console.log("Linha: ", pedido.linha_cop);
    if (pedido.linha_cop !== "FCO") {
      setMessageFco({
        type: "danger",
        message: "Pedido não corresponde ao FCO.",
      });
      return;
    }
    const token = "Bearer " + ls.get("token");

    setPedido({ ...pedido, prorrogado: true, status: "DEVOLVIDO" });

    await Axios.put(`/pedidos/${pedido.id}`,pedido, {
      Authorization: token,
    })
    
      .then((response) => {
        //setPedido(response.data);
        setPedido({ 
          ...pedido, 
          prorrogado: true, 
          status: "ESPERA", 
          nr_proposta: pedido.data.nr_proposta,
          cliente: pedido.data.cliente,
          valor: pedido.data.valor,
          mci: pedido.data.mci,
          estado: pedido.data.estado,
          municipio: pedido.data.municipio,
         });
        Axios.post("/pedidos", pedido, {
          Authorization: token,
        });
        setMessageFco({ type: "success", message: response.data.message });
      })
      .catch((error) => {
        //console.log("messagem erro: ", error.response.data.message  );
        //setPedido(error.data);
        setMessageFco({ type: "danger", message: error.response.data.message });
      });
  };

  useEffect(() => {
    async function loadData() {
      const token = "Bearer " + ls.get("token");

      if (!pedidoAlterado.motivo) {
        const id = match.params.id;

        const pedidoResponse = await Axios.get("/pedidos/" + id, {
          Authorization: token,
        });

        setPedido(pedidoResponse.data);

        setPedidoAlterado({
          ...pedidoAlterado,
          valor_anterior: pedidoResponse.data.valor,
          PedidoId: pedidoResponse.data.id,
        });
      }
    }

    loadData();
  }, [pedidoAlterado.motivo]);
  return (
    <Container fluid>
      <Row>
        <Navbar className="wrapper-navbar">
          <Navbar.Brand href="/">
            <Image src={logo} width="40px" />
          </Navbar.Brand>
          <Navbar.Text>Prorrogação Desembolso Agro</Navbar.Text>
          <Nav className="mr-auto"></Nav>
          <Nav.Link href="">Higor de Moraes</Nav.Link>
        </Navbar>
      </Row>
      <p>&nbsp;</p>
      <Col>
        <Row>
          <Col md={6}>
            <Row>
              <h4>Solicitação de alteração de valores e prazos</h4>
            </Row>
            <p>&nbsp;</p>
            <Row>
              <h5>"ATENÇÃO" Válido para Prorrogação:</h5>
              <h5>1 - Todas as Linhas independente do prazo</h5>
              <h5>
                2 - FCO Rural pedidos com novo prazo VINCENDO NO MÊS EM CURSO
              </h5>
            </Row>
            <p>&nbsp;</p>
            <Row>
              <h4>Pedido a ser Alterado</h4>
            </Row>
            <p>&nbsp;</p>
            <p>
              Agência: {pedido.prefixo} - {pedido.dependencia}
            </p>
            <p>Nº da proposta: {pedido.nr_proposta}</p>
            <p>Nome do cliente: {pedido.cliente}</p>
            <p>
              Data Vencimento autorização:{" "}
              {formatAmericanToBrazillianDateAndTime(pedido.aut_ate)}
            </p>
            <p>Valor: {formatNumber(pedido.valor)}</p>
            <p>&nbsp;</p>
            <Col>
              {message ? (
                <Col className="text-center">
                  <Alert variant={message.type}>{message.message}</Alert>
                </Col>
              ) : null}
            </Col>
            <Col></Col>
            <Form onSubmit={handleSubmit}>
              {/* INPUT */}
              <Form.Group as={Row} controlId="alteracaoPedido">
                <Col md={8}>
                  <Form.Label>Novo Prazo</Form.Label>
                  <Form.Control
                    type="date"
                    required
                    value={pedidoAlterado.novo_prazo}
                    onChange={(e) =>
                      setPedidoAlterado({
                        ...pedidoAlterado,
                        novo_prazo: e.target.value,
                      })
                    }
                  />
                </Col>
              </Form.Group>
              <Row>
                <Col>
                  {/* INPUT */}
                  <Form.Label>Motivo</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={pedidoAlterado.motivo}
                    onChange={(e) =>
                      setPedidoAlterado({
                        ...pedidoAlterado,
                        motivo: e.target.value,
                      })
                    }
                  />
                </Col>
              </Row>
              <p>&nbsp;</p>
              <Row>
                <Col>
                  <Button variant="primary" type="submit" block>
                    Prorrogar Pedido
                  </Button>
                </Col>
              </Row>
            </Form>
            <p>&nbsp;</p>
            <p>
              <strong>OBS:</strong> Campo(s) de preenchimento obrigatório.
            </p>
            <p>
              <Link to={{ pathname: `/` }}>
                <Button variant="primary" size="sm">
                  Voltar
                </Button>
              </Link>
            </p>
          </Col>
          <Col md={6}>
            <h4>FCO Rural</h4>
            <blockquote className="text-justify">
              Para as propostas com a fonte de recurso FCO, somente é permitido
              a solicitação de prorogação de prazo para datas{" "}
              <strong>dentro do mês vigente da proposta</strong>. Para solicitar
              um prazo superior ao permitido pela Super GO, você podera
              cadastrar um novo pedido com os mesmos dados do anterior clicando
              no botão abaixo. Ao fazer um novo pedido, o anterior
              automaticamente será classificado como VENCIDO, e um novo pedido
              referente a mesma proposta ficará em análise pelo Assessor da
              Super GO. Caso necessite alterar algum dado do pedido, após
              encaminhar a soliticação de prorrogação do FCO, entre em contato
              com um assessor da Super GO através do Correio SISBB.
            </blockquote>
            <p>&nbsp;</p>
            <Button
              variant="warning"
              type="button"
              onClick={() => handleSubmitFco()}
              block
            >
              Prorrogação FCO MÊS POSTERIOR
            </Button>
            <p>&nbsp;</p>
            <Col>
              {messageFco ? (
                <Col className="text-center">
                  <Alert variant={messageFco.type}>{messageFco.message}</Alert>
                </Col>
              ) : null}
            </Col>
            <p>&nbsp;</p>
            <h4>Orientações</h4>
            <p className="text-justify">
              O número do correio que é informado pode ser encontrado através do
              SISBB(aplicativo correio) na mensagem onde informa a autorização
              do pedido de desembolso
            </p>
            <p className="text-justify">
              A solicitação de alteração do prazo somente será modificada, após
              autorização do responsável pelas analises de pedido. Após a
              solicitação, fica impossiblitado o gestor solicitar uma nova data,
              antes que o pedido anterior seja analisado.
            </p>
          </Col>
        </Row>
      </Col>
    </Container>
  );
};

export default ProrrogacaoPedido;
// <%--
//     Document   : AdministrarAgro
//     Created on : 31/03/2014, 08:36:40
//     Alterado em : 09/07/2015 por Diogo Oliveira
//     Author     : Augusto
// --%>

// <%@include file="/novoAgro/views/main_pages/header.jsp" %>
//         <script>
//             function moeda(z) {
//                 v = z.value;
//                 v = v.replace(/\D/g, ""); //permite digitar apenas números
//                 v = v.replace(/[0-9]{12}/, "inválido"); //limita pra máximo 999.999.999,99
//                 v = v.replace(/(\d{1})(\d{8})$/, "$1.$2"); //coloca ponto antes dos últimos 8 digitos
//                 v = v.replace(/(\d{1})(\d{5})$/, "$1.$2"); //coloca ponto antes dos últimos 5 digitos
//                 v = v.replace(/(\d{1})(\d{1,2})$/, "$1,$2"); //coloca virgula antes dos últimos 2 digitos
//                 z.value = v;
//             }
//         </script>
//         <script>
//             jQuery(function ($) {
//                 $("#novo_prazo").mask("99/99/9999");
//                 $("#n_correio").mask("9999/99999999");
//             });
//         </script>
//         <style type="text/css" media="all">
//             .alerta{
//                 padding: 3px;
//                 background: #FFA54E;
//                 margin:7px;
//             }
//             .sucesso{
//                 background: #9ad717;
//                 margin:7px;
//                 padding: 3px;
//             }
//         </style>
//     </head>

//     <body>
//         <%@include file="/novoAgro/views/main_pages/navbar.jsp" %>
//         <div className="container">

//            <!-- Cabeçalho -->
//             <h3 id="titulo" className="text-center" style="border-bottom: 2px solid deepskyblue; margin: 15pt; padding:8pt;">
//                 Pedido de Desembolso Agro
//             </h3>

//             <div className="row" style="padding-bottom: 20pt; padding-right: 10pt; font-size: 12pt;">
//                 <a href="http://supergo.bb.com.br/AgroIndex.bb" style="margin-left: 20pt; color: #888;" className="pull-right">
//                     <span className="glyphicon glyphicon-home"></span>
//                     <p style="display: inline; margin-left: 10pt">Inicio</p>
//                 </a>

//                <a href="http://supergo.bb.com.br/PedidosDesembolso.bb" style="margin-left: 20pt; color: #888;" className="pull-right">
//                    <span className="glyphicon glyphicon-arrow-left"></span>
//                    <p style="display: inline; margin-left: 10pt">Voltar</p>
//                </a>

//             </div>
//              <!-- Fim Cabeçalho -->

//                 <div className="row">

//                     <div className="col-md-7">

//                          <!-- Formulário Prorrogação -->

//                         <form method="post" action="/PedidosDesembolso.bb?SolicitarAlteracao=true" id="form_desembolso1" name="form_desembolso">
//                             <fieldset>

//                                 <h4>Solicitação de alteração de valores e prazos</h4><br>
// 								                  <h4>"ATENÇÃO" Válido para Prorrogação: </h4>
// 								                  <h4>1) Todas as Linhas independente do prazo</h4>
// 								                  <h4>2) FCO Rural pedidos com novo prazo VINCENDO NO MÊS EM CURSO</h4>

//                                 <!-- Informações -->
//                                 <c:if test="${not empty listaInfoPedido}">
//                                     <p>${listaInfoPedido.prefixo} - ${listaInfoPedido.dependencia}</p>
//                                     <p>Nº da proposta: ${listaInfoPedido.nr_proposta}</p>
//                                     <p>Nome do cliente: ${listaInfoPedido.cliente}</p>
//                                     <P>Fonte do recurso: ${listaInfoPedido.fonte_recurso}</P>
//                                 </c:if>
//                                 <c:if test="${not empty pedido}">
//                                     <p>${pedido.prefixo} - ${pedido.dependencia}</p>
//                                     <p>Nº da proposta: ${pedido.nr_proposta}</p>
//                                     <p>Nome do cliente: ${pedido.cliente}</p>
//                                     <P>Fonte do recurso: ${pedido.fonte_recurso}</P>
//                                 </c:if>
//                                 <p></p><br>
//                                 <c:if test="${MostraMsg!=null}">
//                                     <div className="alerta">
//                                         <h3>${MostraMsg}</h3>
//                                     </div>
//                                 </c:if>
//                                 <c:if test="${MostraMsgSucesso!=null}">
//                                     <div className="sucesso">
//                                         <h3>${MostraMsgSucesso}</h3>
//                                     </div>
//                                 </c:if>
//                                 <c:if test="${novo_prazo!=null}">
//                                     <p>Novo prazo solicitado: ${novo_prazo}</p>
//                                 </c:if>

//                                 <!-- Hidden fields -->
//                                 <div className="form-group">
//                                     <input type="hidden" name="prefixo" id="prefixo" value="${listaInfoPedido.prefixo}"/>
//                                     <input type="hidden" name="cod_pedido" id="cod_pedido" value="${listaInfoPedido.cod_pedido}"/>
//                                     <input type="hidden" name="valor" id="valor_anterior" value="${listaInfoPedido.valor}"/>
//                                     <input type="hidden" name="aut_ate" id="prazo_anterior" value="<fmt:formatDate pattern="dd/MM/yyyy" value="${listaInfoPedido.aut_ate}" />"/>
//                                     <input type="hidden" name="dependencia" id="dependencia" value="${listaInfoPedido.dependencia}"/>
//                                     <input type="hidden" name="cliente" id="cliente" value="${listaInfoPedido.cliente}"/>
//                                     <input type="hidden" name="nr_proposta" id="nr_proposta" value="${listaInfoPedido.nr_proposta}"/>
//                                     <input type="hidden" name="fonte_recurso" id="fonte_recurso" value="${listaInfoPedido.fonte_recurso}"/>
//                                 </div>

//                                 <!-- Input fields -->
//                                 <div className="form-group row">
//                                     <label className="control-label col-md-2" for="novo_prazo">Novo Prazo</label>
//                                     <div className="col-md-8">
//                                         <input className="form-control" id="novo_prazo" name="novo_prazo" className="input-xlarge" type="text">
//                                         <p className="help-block">Prazo atual: <fmt:formatDate pattern="dd/MM/yyyy" value="${listaInfoPedido.aut_ate}" /></p>
//                                     </div>
//                                 </div>
//                                 <div className="form-group row">
//                                     <label className="control-label col-md-2" for="motivo">Motivo*:</label>
//                                     <div className="col-md-8">
//                                         <textarea className="form-control" id="motivo" name="motivo" required ></textarea>
//                                     </div>
//                                 </div>

//                                 <div className="form-group row">
//                                     <label className="control-label col-md-2" for="novo_prazo">Nº Correio*:</label>
//                                     <div className="col-md-8">
//                                         <input className="form-control" id="n_correio" name="n_correio" readonly type="text" value="${listaInfoPedido.correio_autorizacao}" required>
//                                         <p className="help-block">Nº do Correio recebido através do SISBB constando a autorização do pedido.</p>
//                                     </div>
//                                 </div>

//                                 <!-- Button -->
//                                 <div className="form-group row">
//                                     <label className="col-md-2" for="enviar"></label>
//                                     <div className="controls col-md-8">
//                                         <button id="enviar" type="submit" name="enviar" className="center-block btn btn-success">Enviar Solicitação Prorrogação</button>
//                                     </div>
//                                 </div>

//                             </fieldset>
//                                         <p><strong>OBS:</strong><br>Campo(s) de preenchimento obrigatório.</p>
//                         </form>

//                     </div>

//                     <div className="col-md-5">

//                         <h4>FCO Rural</h4><br>
//                         <blockquote style="font-size: 11pt;">
//                             Para as propostas com a fonte de recurso FCO, somente é permitido a solicitação de prorogação de prazo para datas <strong>dentro do mês vigente da proposta</strong>.
//                             Para solicitar um prazo superior ao permitido pela Super GO, você podera cadastrar um novo pedido com os mesmos dados do anterior clicando no botão abaixo. Ao fazer um
//                             novo pedido, o anterior automaticamente será classificado como VENCIDO, e um novo pedido referente a mesma proposta ficará em análise pelo Assessor da Super GO.
//                             Caso necessite alterar algum dado do pedido, após encaminhar a soliticação de prorrogação do FCO, entre em contato com um assessor da Super GO através do Correio SISBB.
//                         </blockquote>

//                         <form method="POST" action="/PedidosDesembolso.bb" >
//                             <input type="hidden" name="cod_pedido" value="${listaInfoPedido.cod_pedido}" />
//                             <button className="center-block btn btn-warning" type="submit" name="fco_prorrogacao">Prorrogação FCO MÊS POSTERIOR</button>
//                         </form>
//                             <br>
//                             <c:if test="${not empty MsgSucesso}">
//                                 <p className="alert-info text-center">${MsgSucesso}</p>
//                             </c:if>
//                             <c:if test="${not empty MsgErro}">
//                                 <p className="danger-info text-center">${MsgErro}</p>
//                             </c:if>
//                             <br>
//                             <h4>Orientações</h4>
//                             <p className="text-justify">O número do correio que é informado pode ser encontrado através do SISBB(aplicativo correio) na mensagem onde informa a autorização do pedido de desembolso</p>
//                             <p className="text-justify">A solicitação de alteração do prazo somente será modificada, após autorização do responsável pelas analises de pedido. Após a solicitação, fica impossiblitado o gestor solicitar uma nova data, antes que o pedido anterior seja analisado.</p>

//                     </div>

//                 </div>
//             </div>
//                 </div>
//                 <div>
//                     <!-- ++++++++++++ -->
//                 </div>

//             </div>
//         </div>
//     </body>
// </html>
