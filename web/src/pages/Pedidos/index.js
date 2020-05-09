import React, { useEffect, useState } from "react";
import {
  Button,
  Row,
  Container,
  Col,
  Form,
  Nav,
  Navbar,
  Alert,
  Table,
  Image,
} from "react-bootstrap";

import InputMask from "react-input-mask";
import ls from "local-storage";
import logo from "../../assets/images/logo.png";

import Axios from "../../services";

import "./styles.css";
const Pedido = () => {
  const INITIAL_STATE = {
    regional: 8888,
    prefixo: 1610,
    dependencia: "DependenciaTeste",
    cliente: "ClienteTeste",
    nr_proposta: 123,
    valor: 100000,
    municipio: "MunicipioTeste",
    cliente_cop: "ClienteCopTeste",
    valor_cop: 100000.0,
    operacao_cop: 123123123,
    situacao_cop: "SituacaoCopTeste",
    correio_autorizacao: "CorreioAutorizacaoTeste",
    linha_cop: "LinhaCopTeste",
    status: "EM_ANALISE",
    aut: true,
    aut_ate: "2020-10-10",
    mci: 123123123,
    mci_cop: 123123123,
    fonte_recurso: "FonteRecursoTeste",
    ride: "RideTeste",
    area_atuacao: "AreaAtuacaoTeste",
    devolucao: "DevolucaoTeste",
    cartao: 123.0,
    data_autorizacao: "2020-10-10",
    data_cadastro: "2020-10-10",
    estado: "EstadoTeste",
    motivo_exclusao: "MotivoExclusaoTeste",
    data_acolhimento: "2020-10-10",
    taxa_juros: 20.0,
    data_despacho: "2020-10-10",
    data_formalizacao: "2020-10-10",
    prefixo_op: 1610,
    prorrogrado: true,
    matricula: "T1073921",
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

    setPedido({ ...pedido, prefixo: ls.get("prefixo") });

    Axios.post("/pedidos", pedido, {
      Authorization: token,
    })
      .then((response) => {
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
          <Nav className="mr-auto"></Nav>
          <Nav.Link href="">teste@teste.com</Nav.Link>
        </Navbar>
      </Row>
      <Row>
        <Col>
          <h1>Pedidos</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          {status ? (
            <Col className="text-center">
              <Alert variant={status.type}>{status.message}</Alert>
            </Col>
          ) : null}

          <Col md={6}>
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
                />
              </Form.Group>
              {/* INPUT */}

              <Row>
                <Col md={4}>
                  {/* INPUT */}
                  <Form.Group controlId="mci">
                    <Form.Label>MCI</Form.Label>

                    <InputMask
                      className="form-control"
                      mask="999999999"
                      maskChar=""
                      onChange={(e) =>
                        setPedido({ ...pedido, mci: e.target.value })
                      }
                      value={pedido.mci}
                    />
                  </Form.Group>
                  {/* INPUT */}
                </Col>
                <Col md={4}>
                  {/* INPUT */}
                  <Form.Label>No. da Proposta</Form.Label>
                  <InputMask
                    className="form-control"
                    mask="999999999"
                    maskChar=""
                    onChange={(e) =>
                      setPedido({ ...pedido, nr_proposta: e.target.value })
                    }
                    value={pedido.nr_proposta}
                  />
                  {/* INPUT */}
                </Col>
              </Row>

              <Row>
                <Col>
                  <Button variant="primary" type="submit">
                    Salvar
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Col>
      </Row>
      <p>&nbsp;</p>

      <Row>
        <Col>
          <Form.Group controlId="agencia">
            <Form.Label>Agência</Form.Label>
            <Form.Control as="select">
              {agencias.map((agencia) => (
                <option key={agencia.prefixo} value="{agencia.prefixo}">
                  {agencia.prefixo} - {agencia.dependencia}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Prefixo</th>
                <th>Nome</th>
                <th>MCI</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.length > 0 ? pedidos.map((pedido, index) => (
                <tr key={index}>
                  <td>{pedido.id}</td>
                  <td>{pedido.prefixo}</td>
                  <td>{pedido.cliente}</td>
                  <td>{pedido.mci}</td>
                </tr>
              )):<tr><td>Nenhum pedido encontrado para sua agência.</td></tr>}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
    /*<div id="app">
     <div className="container-fluid">
      <asider>
        <div className="row-fluid alert alert-warning">
            <h4>BB Custeio e PRONAMP Custeio</h4>
            <div className="text-justify">
                <p>A fonte de recurso para as linhas BB Custeio  e PRONAMP Custeio foi alterada.</p>
                <p>Para mais informações, consultar a IN 607-1 item 2.3.3</p>
            </div>
        </div>
        <div className="row-fluid alert alert-warning">
          <h4>Prorrogação FCO Rural</h4>
          <div className="text-justify">
              <p>Para as propostas com a fonte de recurso FCO, somente é permitida 
              a solicitação de prorogação de prazo para datas dentro do 
              mês vigente da proposta. Para solicitar um prazo superior ao 
              permitido pela Super GO, você deve cadastrar um novo pedido com os 
              mesmos dados do anterior. Isso é feito da seguinte maneira:</p>
              <ul>
                  <li>
                      Clique no botão Prorrogação (verde) ao lado do pedido
                  autorizado. Você será redirecionado à página de pedidos
                  de prorrogação.
                  </li>
                  <li>
                      <strong>Não preencha o formulário na página.</strong> 
                      Apenas clique no botão laranja "Prorrogação FCO".
                  </li>
              </ul>
              <p>Ao clicar no botão laranja, o pedido autorizado será automaticamente 
              classificado como VENCIDO, e um novo pedido com os dados do anterior
              e referente à  mesma proposta ficará em análise na Super GO.</p>
          </div>
        </div>
      </asider>
      <main>
        <strong> Cadastrar Pedido </strong>

        <form>
          <div className="input-block">
            <label thmlFor="cliente">Nome</label>
            <input name="cliente" id="cliente" required />
          </div>
          <div className="input-block">
            <label thmlFor="mci">MCI</label>
            <input name="mci" id="mci" required />
          </div>
          <div className="input-block">
            <label thmlFor="nr_proposta">Nr da Proposta COP</label>
            <input name="nr_proposta" id="nr_proposta" required />
          </div>
          <div className="input-block">
            <label thmlFor="valor">Valor do Pedido</label>
            <input name="valor" id="valor" required />
          </div>
          <div className="input-block">
            <label thmlFor="municipio">Município de Localização do Empreendimento</label>
            <input name="municipio" id="municipio" required />
          </div>
          <div className="input-block">
            <label thmlFor="Estado">Estado</label>
            <select id="Estado" name="Estado" required>
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
          </select>
          </div>
          <div className="class-button"> 
            <Button variant="primary" type="submit">ADICIONAR PEDIDO</Button>
          </div>  
        </form>
        <lu>
          <li>

          </li>
        </lu>
      </main>
     </div>
   </div>*/
  );
};

export default Pedido;
