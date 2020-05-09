import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import './global.css';
import './App.css';
import './Main.css';

function App() {
  return (
   <div id="app">
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
   </div>
  );
}

export default App;
