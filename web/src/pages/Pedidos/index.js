import React, { useEffect, useState } from "react";
import ls from "local-storage";
import {
  Button,
  Row,
  Container,
  Col,
  Form,
  Nav,
  Navbar,
  Alert,
  Image,
} from "react-bootstrap";

import MaskedInput from "../../components/masked-input";
import CustomTable from "../../components/custom-table";
import Informacoes from "../../components/info";
import Axios from "../../services";
import { parseStringMoneyToDouble } from "../../util/format";
import logo from "../../assets/images/logo.png";

import "./styles.css";

const Pedido = () => {
  const INITIAL_STATE = {
    regional: 8829,
    prefixo: 0,
    cliente: "",
    mci: "",
    nr_proposta: 0,
    valor: 0.0,
    municipio: "",
    status: "ANALISE",
    estado: "",
  };

  const [pedidos, setPedidos] = useState([]);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [agencias, setAgencias] = useState([]);
  const [pedido, setPedido] = useState(INITIAL_STATE);

  const loadPedidos = async () => {
    const token = "Bearer " + ls.get("token");

    Axios.get("/pedidos", {
      Authorization: token,
    })
      .then((response) => {
        setPedidos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const loadAgencias = async () => {
    const token = "Bearer " + ls.get("token");
    Axios.get("/agencias", {
      Authorization: token,
    })
      .then((response) => {
        setAgencias(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = "Bearer " + ls.get("token");

    let tempPedido = pedido;
    tempPedido.prefixo = ls.get("prefixo");
    tempPedido.mci = pedido.mci.split(".").join("");
    tempPedido.valor = parseStringMoneyToDouble(pedido.valor);

    console.log("pedido", tempPedido);

    Axios.post("/pedidos", pedido, {
      Authorization: token,
    })
      .then((response) => {
        loadPedidos();

        setStatus({ type: "success", message: response.data.message });
      })
      .catch((error) => {
        setStatus({ type: "danger", message: error.response.data.message });
      });
  };

  useEffect(() => {
    loadPedidos();
    loadAgencias();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Navbar className="wrapper-navbar">
          <Navbar.Brand href="/">
            <Image src={logo} width="40px" />
          </Navbar.Brand>
          <Navbar.Text>Pedidos Desembolso Agro</Navbar.Text>
          <Nav className="mr-auto"></Nav>
          <Nav.Link href="">Higor de Moraes</Nav.Link>
        </Navbar>
      </Row>
      <p>&nbsp;</p>
      <Informacoes />
      <p>&nbsp;</p>
      <Row>
        <Col></Col>
        <Col xs={6}>
          <h4>Cadastrar Pedidos</h4>
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col xs={6}>
          {status ? (
            <Col className="text-center">
              <Alert variant={status.type}>{status.message}</Alert>
            </Col>
          ) : null}
          <Col>
            <Form onSubmit={handleSubmit}>
              {/* INPUT */}
              <Form.Group controlId="nomeCliente">
                <Form.Label>Nome do cliente</Form.Label>
                <Form.Control
                  type="cliente"
                  placeholder="João da Silva"
                  value={pedido.cliente}
                  onChange={(e) =>
                    setPedido({ ...pedido, cliente: e.target.value })
                  }
                  required
                />
              </Form.Group>
              {/* INPUT */}

              <Row>
                <Col>
                  {/* INPUT */}
                  <Form.Group controlId="mci">
                    <Form.Label>MCI</Form.Label>
                    <MaskedInput
                      name="mci"
                      maskString={"999.999.999"}
                      onChange={(e) =>
                        setPedido({ ...pedido, mci: e.target.value })
                      }
                      placeholder="000.000.000"
                      value={pedido.mci}
                      required
                    />
                  </Form.Group>
                  {/* INPUT */}
                </Col>
                <Col>
                  {/* INPUT */}
                  <Form.Label>No. da Proposta</Form.Label>

                  <MaskedInput
                    name="nr_proposta"
                    maskString={"000000000"}
                    placeholder="000000000"
                    onChange={(e) =>
                      setPedido({ ...pedido, nr_proposta: e.target.value })
                    }
                    value={pedido.nr_proposta}
                    required
                  />
                  {/* INPUT */}
                </Col>
              </Row>
              <Row>
                <Col>
                  {/*INPUT*/}
                  <Form.Label>Valor</Form.Label>
                  <MaskedInput
                    name="valor"
                    // isReverse
                    // maskString={"#.##0,00"}
                    // maskString={"0#"}
                    // maskString={"000.000.000.000.000,00"}
                    placeholder="0,00"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setPedido({ ...pedido, valor: e.target.value });
                    }}
                    value={pedido.valor}
                  />
                  <p>&nbsp;</p>
                </Col>
                <Col>
                  {/*INPUT*/}
                  <Form.Label>Município do Empreendimento</Form.Label>
                  <Form.Control
                    type="municipio"
                    value={pedido.municipio}
                    onChange={(e) =>
                      setPedido({ ...pedido, municipio: e.target.value })
                    }
                    required
                  ></Form.Control>
                </Col>
              </Row>
              <Row>
                <Col>
                  {/*INPUT*/}
                  <Form.Label>Estado</Form.Label>
                  <Form.Control
                    as="select"
                    type="estado"
                    value={pedido.estado}
                    onChange={(e) =>
                      setPedido({ ...pedido, estado: e.target.value })
                    }
                    required
                  >
                    <option>Selecione o Estado</option>
                    <option value="AC">Acre - AC</option>
                    <option value="AL">Alagoas - AL</option>
                    <option value="AP">Amapá - AP </option>
                    <option value="AM">Amazonas - AM </option>
                    <option value="BA">Bahia - BA </option>
                    <option value="CE">Ceará - CE</option>
                    <option value="DF">Distrito Federal - DF</option>
                    <option value="ES">Espírito Santo - ES</option>
                    <option value="GO">Goiás - GO</option>
                    <option value="MA">Maranhão - MA</option>
                    <option value="MT">Mato Grosso - MT</option>
                    <option value="MS">Mato Grosso do Sul - MS</option>
                    <option value="MG">Minas Gerais - MG</option>
                    <option value="PA">Pará - PA </option>
                    <option value="PB">Paraíba - PB</option>
                    <option value="PR">Paraná - PR</option>
                    <option value="PE">Pernambuco - PE</option>
                    <option value="PI">Piauí - PI</option>
                    <option value="RJ">Rio de Janeiro - RJ</option>
                    <option value="RN">Rio Grande do Norte - RN</option>
                    <option value="RS">Rio Grande do Sul - RS</option>
                    <option value="RO">Rondônia - RO</option>
                    <option value="RR">Roraima - RR</option>
                    <option value="SC">Santa Catarina - SC </option>
                    <option value="SP">São Paulo - SP</option>
                    <option value="SE">Sergipe - SE</option>
                    <option value="TO">Tocantins - TO</option>
                  </Form.Control>
                </Col>
                <Col>
                  {/*INPUT*/}
                  <Form.Label>Linha de Crédito</Form.Label>
                  <Form.Control
                    as="select"
                    type="linha_credito"
                    value={pedido.linha_credito}
                    onChange={(e) =>
                      setPedido({ ...pedido, linha_credito: e.target.value })
                    }
                    required
                  >
                    <option>Selecione a Linha</option>
                    <option value="Pronaf Mais Alimentos">
                      Pronaf Mais Alimentos
                    </option>
                    <option value="Pronaf Mais Alimentos - Máquinas e Equipamentos">
                      Pronaf Mais Alimentos - Máquinas e Equipamentos
                    </option>
                    <option value="Custeio Agropecuário">
                      Custeio Agropecuário
                    </option>
                    <option value="Pronamp Custeio">Pronamp Custeio</option>
                    <option value="Investimento Agropecuário - MODERFROTA">
                      Investimento Agropecuário - MODERFROTA
                    </option>
                    <option value="Investimento Agropecuário - Op de Longo Prazo">
                      Investimento Agropecuário - Op de Longo Prazo
                    </option>
                    <option value="FCO Investimento">FCO Investimento</option>
                    <option value="Pronamp Investimento">
                      Pronamp Investimento
                    </option>
                    <option value="Comercilização - FEE - PGPM">
                      Comercilização - FEE - PGPM
                    </option>
                  </Form.Control>
                </Col>
              </Row>
              <p>&nbsp;</p>
              <Row>
                <Col>
                  <Button variant="primary" type="submit" block>
                    Solicitar Pedido
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Col>
        <Col></Col>
      </Row>
      <p>&nbsp;</p>
      <Row>
        <Col>
          <h3>Em Análise</h3>
          <CustomTable pedidos={pedidos} tipo="ANALISE" />
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Aguardando Recurso</h3>
          <CustomTable pedidos={pedidos} tipo="ESPERA" />
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Solicitação de Prorrogação</h3>
          <CustomTable pedidos={pedidos} tipo="PRORROGADO" />
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Pedidos Autorizados</h3>
          <CustomTable pedidos={pedidos} tipo="AUTORIZADO" />
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Pedidos Recusados</h3>
          <CustomTable pedidos={pedidos} tipo="EXCLUIDO" />
        </Col>
      </Row>
    </Container>
  );
};

export default Pedido;
// <%--
//     Document   : AdministrarAgro
//     Created on : 31/03/2014, 08:36:40
//     Alterado em : 09/07/2015 por Diogo Oliveira
//     Author     : Augusto
// --%>

// <%@include file="/novoAgro/views/main_pages/header.jsp" %>
//     <script>
//         function moeda(z) {
//             v = z.value;
//             v = v.replace(/\D/g, "");  //permite digitar apenas números
//             v = v.replace(/[0-9]{12}/, "inválido");   //limita pra máximo 999.999.999,99
//             v = v.replace(/(\d{1})(\d{8})$/, "$1.$2");  //coloca ponto antes dos últimos 8 digitos
//             v = v.replace(/(\d{1})(\d{5})$/, "$1.$2");  //coloca ponto antes dos últimos 5 digitos
//             v = v.replace(/(\d{1})(\d{1,2})$/, "$1,$2");    //coloca virgula antes dos últimos 2 digitos
//             z.value = v;
//         }

//         function verifica() {
//             if (document.getElementById("fonteRecurso").value !== '' && document.getElementById("nome").value !== '' && document.getElementById("mci").value !== '' && document.getElementById("numeroProposta").value !== '' && document.getElementById("valor").value !== '' && document.getElementById("municipio").value !== '') {
//                 document.form_desembolso.submit();
//                 alert("Pedido de Desembolso submetido com SUCESSO!");
//             } else {
//                 alert("Preencha todos os campos.");
//             }
//         }
//     </script>
// </head>
// <body>
//     <%@include file="/novoAgro/views/main_pages/navbar.jsp" %>
//     <%@include file="/novoAgro/views/main_pages/cabecalho_relatorio.jsp" %>
//     <div class="container-fluid"><br>

//             <div class="row-fluid alert alert-warning">
//                 <h4>BB Custeio e PRONAMP Custeio</h4>
//                 <div class="text-justify">
//                     <p>A fonte de recurso para as linhas BB Custeio  e PRONAMP Custeio foi alterada.<br>
//                     Para mais informações, consultar a IN 607-1 item 2.3.3</p>
//                 </div>
//             </div>

//             <div class="row-fluid alert alert-warning">
//                 <h4>Prorrogação FCO Rural</h4>
//                 <div class="text-justify">
//                     <p>Para as propostas com a fonte de recurso FCO, somente é permitida
//                     a solicitação de prorogação de prazo para datas dentro do
//                     mês vigente da proposta. Para solicitar um prazo superior ao
//                     permitido pela Super GO, você deve cadastrar um novo pedido com os
//                     mesmos dados do anterior. Isso é feito da seguinte maneira:</p>
//                     <ul>
//                         <li>
//                             Clique no botão Prorrogação (verde) ao lado do pedido
//                         autorizado. Você será redirecionado à página de pedidos
//                         de prorrogação.
//                         </li>
//                         <li>
//                             <strong>Não preencha o formulário na página.</strong>
//                             Apenas clique no botão laranja "Prorrogação FCO".
//                         </li>
//                     </ul>
//                     <p>Ao clicar no botão laranja, o pedido autorizado será automaticamente
//                     classificado como VENCIDO, e um novo pedido com os dados do anterior
//                     e referente à  mesma proposta ficará em análise na Super GO.</p>
//                     </p>
//                 </div>
//             </div>

//             <!-- Novo Pedido -->
//             <div class="row-fluid">
//                 <div class="page-header">
//                     <h4><span class="glyphicon glyphicon-plus-sign"></span> Novo Pedido</h4>
//                 </div>
//                 <c:if test="${MsgJaAlerta!=null}">
//                     <div class="text-center" style="color: orange;">
//                         ${MsgJaAlerta}
//                     </div>
//                 </c:if>
//                 <c:if test="${MsgSucesso!=null}">
//                     <div class="text-center" style="color: green;">
//                         ${MsgSucesso}
//                     </div>
//                 </c:if><br>
//                 <form class="form-horizontal row" method="post" action="/PedidosDesembolso.bb" id="form_desembolso1" name="form_desembolso">

//                     <div class="form-group">
//                          <input type="hidden" name="prefixo" id="prefixo" value="${prefixo}"/>
//                          <label class="control-label col-md-4" for="nome">Nome</label>
//                          <div class="col-md-6">
//                              <input type="text" id="nome" name="nome" placeholder=""  onkeyup="this.value = this.value.toUpperCase()" class="form-control" required="">
//                          </div>
//                      </div>
//                      <div class="form-group">
//                          <label class="control-label col-md-4" for="mci">MCI</label>
//                          <div class="col-md-6">
//                              <input type="text" id="mci" name="mci" placeholder=""  onkeyup="this.value = this.value.toUpperCase();
//                                      this.value = this.value.replace(/[^\d]/, '')" class="form-control" required="">
//                          </div>
//                      </div>
//                      <div class="form-group">
//                          <label class="control-label col-md-4" for="numeroProposta">Nº da Proposta COP</label>
//                          <div class="col-md-6">
//                              <input type="text" id="numeroProposta" name="numeroProposta" placeholder="" onkeyup="this.value = this.value.replace(/[^\d]/, '')" class="form-control" required="">
//                          </div>
//                      </div>
//                      <div class="form-group">
//                          <label class="control-label col-md-4" for="valor">Valor do pedido (limitado ao valor COP)</label>
//                          <div class="col-md-6">
//                              <div class="input-group">
//                                  <div class="input-group-addon">R$</div>
//                                  <input type="text" id="valor" name="valor" placeholder="" onkeyup="moeda(this)" class="form-control" required="">
//                              </div>
//                          </div>
//                      </div>
//                       <div class="form-group">
//                          <label class="control-label col-md-4" for="municipio">Município de localização do empreendimento</label>
//                          <div class="col-md-6">
//                              <input type="text" id="municipio" name="municipio" placeholder="" value="${listaInfoPedido.municipio}" onkeyup="this.value = this.value.toUpperCase()" class="form-control" required="">
//                          </div>
//                      </div>
//                      <div class="form-group">
//                          <label class="control-label col-md-4" for="estado">Estado</label>
//                          <div class="col-md-6">
//                              <select id="estado" name="estado" class="form-control">
//                                      <option value="AC">Acre - AC</option>
//                                      <option value="AL">Alagoas - AL</option>
//                                      <option value="AP">Amapá - AP </option>
//                                      <option value="AM">Amazonas - AM </option>
//                                      <option value="BA">Bahia - BA </option>
//                                      <option value="CE">Ceará - CE</option>
//                                      <option value="DF">Distrito Federal - DF</option>
//                                      <option value="ES">Espírito Santo - ES</option>
//                                      <option value="GO">Goiás - GO</option>
//                                      <option value="MA">Maranhão - MA</option>
//                                      <option value="MT">Mato Grosso - MT</option>
//                                      <option value="MS">Mato Grosso do Sul - MS</option>
//                                      <option value="MG">Minas Gerais - MG</option>
//                                      <option value="PA">Pará - PA </option>
//                                      <option value="PB">Paraíba - PB</option>
//                                      <option value="PR">Paraná - PR</option>
//                                      <option value="PE">Pernambuco - PE</option>
//                                      <option value="PI">Piauí - PI</option>
//                                      <option value="RJ">Rio de Janeiro - RJ</option>
//                                      <option value="RN">Rio Grande do Norte - RN</option>
//                                      <option value="RS">Rio Grande do Sul - RS</option>
//                                      <option value="RO">Rondônia - RO</option>
//                                      <option value="RR">Roraima - RR</option>
//                                      <option value="SC">Santa Catarina - SC </option>
//                                      <option value="SP">São Paulo - SP</option>
//                                      <option value="SE">Sergipe - SE</option>
//                                      <option value="TO">Tocantins - TO</option>
//                              </select>
//                          </div>
//                      </div>
//                      <div class="form-group">
//                          <label class="control-label col-md-4" for="fonteRecurso">Fonte do Recurso</label>
//                          <div class="col-md-6">
//                              <select id="fonteRecurso" name="fonteRecurso" class="form-control">
//                                  <option value="">...</option>
//                                  <option value="FCO">FCO</option>
//                                  <option value="MCR 6.2 Controlado">MCR 6.2 Controlado</option>
//                                  <option value="MCR 6.4 - Poupanca-Ouro Controlada">MCR 6.4 - Poupança-Ouro Controlada</option>
//                                  <option value="MCR 6.4 - Poupanca-Ouro Nao Controlada">MCR 6.4 - Poupança-Ouro Não Controlada</option>
//                              </select>
//                          </div>
//                      </div>
//                      <div class="form-group">
//                          <!--
//                          <div class="center-block">
//                              <label class="control-label col-md-4" for="fco_prorrogacao">Prorrogação FCO</label>
//                              <div class="col-md-6">
//                              <input type="checkbox" name="fco_prorrogacao" value="sim">
//                              </div>
//                          </div>
//                          -->
//                      </div>
//                       <div class="form-group">
//                          <label class="col-md-4" for="enviar"></label>
//                          <div class="col-md-6">
//                              <input type="hidden" value="Adicionar" name="adicionar">
//                              <button id="enviar" name="enviar" class="btn btn-primary center-block">Adicionar</button>
//                          </div>
//                      </div>
//                  </form>
//             </div>
//             <!-- Fim Novo Pedido -->

//         <c:choose>
//             <c:when test="${mesngemErro!=null}">
//                 <h3><strong>${mesngemErro}</strong></h3>
//             </c:when>
//             <c:otherwise>
//                 <div class="row-fluid">
//                     <div class="page-header">
//                         <h4><span class="glyphicon glyphicon-pencil"></span> Em Análise</h4>
//                     </div>
//                     <div class="panel-body">
//                         <c:if test="${empty listaPedidosANALISE}">
//                             <p class="text-center">Nenhum pedido</p>
//                         </c:if>
//                         <c:if test="${not empty listaPedidosANALISE}">
//                             <table class="table-agro table table-hover table-striped"
//                                    data-toggle="table" data-url="data1.json" data-cache="false"
//                                    data-height="400">
//                                 <thead>
//                                     <tr>
//                                         <c:if test="${mostraPrefixos!=null}">
//                                             <th data-field="Prefixo">Prefixo</th>
//                                             <th data-field="dependencia">Dependência</th>
//                                             </c:if>
//                                         <th data-field="cliente">Cliente</th>
//                                         <th data-field="nproposta">Nr. Proposta</th>
//                                         <th data-field="valorsolic">Valor Solicitado</th>
//                                         <th data-field="municipio">Município</th>
//                                         <th data-field="acoes"></th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     <c:forEach var="listaPedidosANALISE" items="${listaPedidosANALISE}">
//                                         <tr>
//                                             <c:if test="${mostraPrefixos!=null}">
//                                                 <td>${listaPedidosANALISE.prefixo}</td>
//                                                 <td>${listaPedidosANALISE.dependencia}</td>
//                                             </c:if>
//                                             <td>${listaPedidosANALISE.cliente}</td>
//                                             <td>${listaPedidosANALISE.nr_proposta}</td>
//                                             <td>${listaPedidosANALISE.valor_string}</td>
//                                             <td>${listaPedidosANALISE.municipio}</td>
//                                             <td>
//                                                 <form class="form-inline" method="POST" action="/PedidosDesembolso.bb" onsubmit="alert('Pedido excluído com sucesso!')">
//                                                     <input type="hidden" name="cod_pedido" value="${listaPedidosANALISE.cod_pedido}" />
//                                                     <input class="btn-danger" type="submit" name="excluir" value="Excluir"/>
//                                                 </form>
//                                             </td>
//                                         </tr>
//                                     </c:forEach>
//                                 </tbody>
//                             </table>
//                         </c:if>
//                     </div>
//                 </div>

//                 <div class="row-fluid">
//                     <div class="page-header">
//                         <h4><span class="fa fa-fw fa-hourglass-half"></span> Aguardando recurso</h4>
//                     </div>
//                     <div class="panel-body">
//                           <c:if test="${empty listaPedidosESPERA}">
//                             <p class="text-center">Nenhum pedido</p>
//                         </c:if>
//                         <c:if test="${not empty listaPedidosESPERA}">
//                             <table class="table table-agro table-hover table-striped"
//                                    data-toggle="table" data-url="data1.json" data-cache="false"
//                                    data-height="400">
//                                 <thead>
//                                     <tr>
//                                         <c:if test="${mostraPrefixos!=null}">
//                                             <th data-field="Prefixo">Prefixo</th>
//                                             <th data-field="Dependência">Dependência</th>
//                                             </c:if>
//                                         <th data-field="Cliente">Cliente</th>
//                                         <th data-field="Proposta">Nr. Proposta</th>
//                                         <th data-field="Valor">Valor</th>
//                                         <th data-field="Município">Município</th>
//                                         <th data-field="Linha">Fonte do recurso</th>
//                                         <th data-field="Linha">Linha COP</th>
//                                         <th data-field="Excluir"></th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     <c:forEach var="listaPedidosESPERA" items="${listaPedidosESPERA}">
//                                         <tr>
//                                             <c:if test="${mostraPrefixos!=null}">
//                                                 <td style="width: 60px;">${listaPedidosESPERA.prefixo}</td>
//                                                 <td>${listaPedidosESPERA.dependencia}</td>
//                                             </c:if>
//                                             <td>${listaPedidosESPERA.cliente}</td>
//                                             <td style="width: 100px;">${listaPedidosESPERA.nr_proposta}</td>
//                                             <td style="width: 100px;">${listaPedidosESPERA.valor_string}</td>
//                                             <td>${listaPedidosESPERA.municipio}</td>
//                                             <td>${listaPedidosESPERA.fonte_recurso}</td>
//                                             <td>${listaPedidosESPERA.linha_cop}</td>
//                                             <td>
//                                                 <c:if test="${mostraPrefixos!=null}">
//                                                 <form class="form-inline" method="POST" action="/PedidosDesembolso.bb" onsubmit="alert('Pedido excluído com sucesso!')">
//                                                     <input type="hidden" name="cod_pedido" value="${listaPedidosESPERA.cod_pedido}" />
//                                                     <input class="btn-warning center-block" type="submit" name="excluir_espera" value="Recusar"/>
//                                                         <select style="width: 200px;" class="center-block"  id="motivo_exclusao" name="motivo_exclusao" class="form-control">
//                                                             <option value="Sem valor">...</option>
//                                                             <option value="Número da proposta incorreto">Número da proposta incorreto</option>
//                                                             <option value="Valor COP Excedido">Valor COP Excedido</option>
//                                                             <option value="Fonte de recursos incorreta">Fonte de recursos incorreta</option>
//                                                             <option value="Pedido duplicado">Pedido duplicado</option>
//                                                             <option value="Prazo expirado">Prazo expirado</option>
//                                                             <option value="Sem necessidade de solicitação da Super Goiás para esta linha de crédito">Sem necessidade de solicitação da Super Goiás para esta linha de crédito</option>
//                                                             <option value="OUTRO">Outro</option>
//                                                         </select>
//                                                 </form>
//                                                 </c:if>
//                                                 <c:if test="${mostraPrefixos==null}">
//                                                 <form class="form-inline" method="POST" action="/PedidosDesembolso.bb" onsubmit="alert('Pedido excluído com sucesso!')">
//                                                     <input type="hidden" name="cod_pedido" value="${listaPedidosESPERA.cod_pedido}" />
//                                                     <input class="btn-danger" type="submit" name="excluir" value="Excluir"/>
//                                                 </form>
//                                                 </c:if>
//                                             </td>
//                                         </tr>
//                                     </c:forEach>
//                                 </tbody>
//                             </table>
//                         </c:if>
//                     </div>
//                 </div>

//                 <c:if test="${prefixo != 8486}">
//                     <div class="row-fluid">
//                         <div class="page-header">
//                             <h4><span class="fa fa-fw fa-ban"></span> Recusados</h4>
//                         </div>
//                         <div class="panel-body">
//                             <c:if test="${empty listaPedidosEXCLUIDO}">
//                                 <p class="text-center">Nenhum pedido</p>
//                             </c:if>
//                             <c:if test="${not empty listaPedidosEXCLUIDO}">
//                                 <table class="table table-agro table-hover table-striped"
//                                        data-toggle="table" data-url="data1.json" data-cache="false" data-height="400">
//                                     <thead>
//                                         <tr>
//                                             <th data-field="Cliente">Cliente</th>
//                                             <th data-field="Proposta">Nr. Proposta</th>
//                                             <th data-field="Valor">Valor</th>
//                                             <th data-field="Município">Município</th>
//                                             <th data-field="Linha">Linha COP</th>
//                                             <th data-field="Motivo">Motivo da Recusa</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         <c:forEach var="listaPedidosEXCLUIDO" items="${listaPedidosEXCLUIDO}">
//                                             <tr>
//                                                 <td>${listaPedidosEXCLUIDO.cliente}</td>
//                                                 <td>${listaPedidosEXCLUIDO.nr_proposta}</td>
//                                                 <td>${listaPedidosEXCLUIDO.valor_string}</td>
//                                                 <td>${listaPedidosEXCLUIDO.municipio}</td>
//                                                 <td>${listaPedidosEXCLUIDO.linha_cop}</td>
//                                                 <td>${listaPedidosEXCLUIDO.motivo_exclusao}</td>
//                                             </tr>
//                                         </c:forEach>
//                                     </tbody>
//                                 </table>
//                             </c:if>
//                         </div>
//                      </div>

//                     <div class="row-fluid">
//                         <div class="page-header">
//                             <h4><span class="fa fa-fw fa-check-circle"></span> Autorizados</h4>
//                         </div>

//                         <c:if test="${empty listaPedidosAUTORIZADO}">
//                             <p class="text-center">Nenhum pedido</p>
//                         </c:if>
//                         <c:if test="${not empty listaPedidosAUTORIZADO}">
//                             <table class="table table-agro table-hover table-striped"
//                                    data-toggle="table" data-url="data1.json" data-cache="false"
//                                    data-height="400">
//                                 <thead>
//                                     <tr>
//                                         <c:if test="${mostraPrefixos!=null}">
//                                             <th data-field="Prefixo">Prefixo</th>
//                                             <th data-field="Dependência">Dependência</th>
//                                         </c:if>
//                                         <th data-field="Cliente">Cliente</th>
//                                         <th data-field="Proposta">Nr. Proposta</th>
//                                         <th data-field="Valor">Valor</th>
//                                         <th data-field="Município">Município</th>
//                                         <th data-field="Linha">Linha COP</th>
//                                         <th data-field="Correio">Correio</th>
//                                         <th data-field="Autorizado">Autorizado Até</th>
//                                         <th></th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     <c:forEach var="listaPedidosAUTORIZADO" items="${listaPedidosAUTORIZADO}">
//                                         <tr>
//                                             <c:if test="${mostraPrefixos!=null}">
//                                                 <td>${listaPedidosAUTORIZADO.prefixo}</td>
//                                                 <td>${listaPedidosAUTORIZADO.dependencia}</td>
//                                             </c:if>
//                                             <td>${listaPedidosAUTORIZADO.cliente}</td>
//                                             <td style="width: 100px;">${listaPedidosAUTORIZADO.nr_proposta}</td>
//                                             <td style="width: 120px;">${listaPedidosAUTORIZADO.valor_string}</td>
//                                             <td>${listaPedidosAUTORIZADO.municipio}</td>
//                                             <td>${listaPedidosAUTORIZADO.linha_cop}</td>
//                                             <td>${listaPedidosAUTORIZADO.correio_autorizacao}</td>
//                                             <td style="width: 110px;"><fmt:formatDate pattern="dd/MM/yyyy" value="${listaPedidosAUTORIZADO.aut_ate}" /></td>
//                                             <td>
//                                                 <form method="POST" action="/PedidosDesembolso.bb" >
//                                                     <input type="hidden" name="cod_pedido" value="${listaPedidosAUTORIZADO.cod_pedido}" />
//                                                     <input class="btn-success" type="submit" name="editar" value="Prorrogação"/>
//                                                 </form>
//                                             </td>
//                                         </tr>
//                                     </c:forEach>
//                                 </tbody>
//                             </table>
//                         </c:if>
//                     </div>
//                 </c:if>
//            </c:otherwise>
//         </c:choose>
//     </div>
// </body>
// </html>
