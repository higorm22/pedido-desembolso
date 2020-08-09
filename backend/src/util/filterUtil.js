const cookie = require('cookie');
const axios = require('axios');

module.exports = {
  setCookie(res, key, value) {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize(key, String(value), {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 1 week
      }),
    );
  },

  async getUserAttributes(server, tokenId) {
    // const url =
    //   'http://' + server + '/sso/identity/attributes?subjectid=' + tokenId;
    const url = 'http://localhost:3333/sso-simulator';

    const response = await axios.get(url);

    const userDetails = response.data;

    const userAttributesIndex = userDetails.indexOf(
      'userdetails.attribute.name=',
    );

    const attributes = userDetails.substring(
      userAttributesIndex,
      response.length,
    );

    const splittedAttributes = attributes.split('\n');

    const parsedAttributes = {};

    
    let key = '';
    let value = '';

    for (let x = 0; x < splittedAttributes.length; x++) {
      let attr = splittedAttributes[x];
     

      if (attr.includes('userdetails.attribute.name')) {
        key = attr.replace(/userdetails.attribute.name=/g, '');
      }

      if (attr.includes('userdetails.attribute.value')) {
        value = attr.replace(/userdetails.attribute.value=/g, '');
      }

      if (x % 1 == 0 && x !== 0 ) {
        parsedAttributes[key] = value;
      }
    }

    return parsedAttributes;
  },

  simulateCookies(res, NOME_COOKIE_SSO, NOME_COOKIE_ACR) {
    console.log("Simulando cookies...");
    this.setCookie(
      res,
      NOME_COOKIE_SSO,
      'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    );
    this.setCookie(res, NOME_COOKIE_ACR, 'sso.intranet.bb.com.br');
  },

  simulateAuthInformation() {
    return (
      'userdetails.attribute.name=cd-pref-depe\n' +
      'userdetails.attribute.value=8486\n' +
      'userdetails.attribute.name=nr-cpf\n' +
      'userdetails.attribute.value=70217238149\n' +
      'userdetails.attribute.name=cd-cmss-fun\n' +
      'userdetails.attribute.value=14011\n' +
      'userdetails.attribute.name=homephone\n' +
      'userdetails.attribute.value=0\n' +
      'userdetails.attribute.name=mail\n' +
      'userdetails.attribute.value=higormoraes@bb.com.br\n' +
      'userdetails.attribute.name=telephonenumber\n' +
      'userdetails.attribute.value=062 32165661\n' +
      'userdetails.attribute.name=cd-tip-dep\n' +
      'userdetails.attribute.value=26\n' +
      'userdetails.attribute.name=cd-idgl-usu\n' +
      'userdetails.attribute.value=F4193962\n' +
      'userdetails.attribute.name=grupamento\n' +
      'userdetails.attribute.value=11\n' +
      'userdetails.attribute.name=codigoComissao\n' +
      'userdetails.attribute.value=14011\n' +
      'userdetails.attribute.name=prefixoDiretoria\n' +
      'userdetails.attribute.value=9270\n' +
      'userdetails.attribute.name=prefixoDependencia\n' +
      'userdetails.attribute.value=8486\n' +
      'userdetails.attribute.name=codigoPilar\n' +
      'userdetails.attribute.value=2019\n' +
      'userdetails.attribute.name=ibm-nativeid\n' +
      'userdetails.attribute.value=F4193962\n' +
      'userdetails.attribute.name=oauth2savedconsent\n' +
      'userdetails.attribute.value=cfsbank openid profile email\n' +
      'userdetails.attribute.value=web-calc openid profile\n' +
      'userdetails.attribute.value=intraneteuropa phone email address openid profile\n' +
      'userdetails.attribute.value=oaas openid profile\n' +
      'userdetails.attribute.value=portal85 openid profile\n' +
      'userdetails.attribute.name=uid\n' +
      'userdetails.attribute.value=f4193962\n' +
      'userdetails.attribute.name=_pwd\n' +
      'userdetails.attribute.value=jhiZtzUtECP3wXs/lHMvXQ==\n' +
      'userdetails.attribute.name=bb-filtergroup\n' +
      'userdetails.attribute.value=cn=gmdc05a,ou=mdc,ou=aplicacao,ou=grupos,ou=acesso,O=BB,C=BR\n' +
      'userdetails.attribute.value=cn=gmdc01a,ou=mdc,ou=aplicacao,ou=grupos,ou=acesso,O=BB,C=BR\n' +
      'userdetails.attribute.name=nm-idgl\n' +
      'userdetails.attribute.value=Higor de Moraes\n' +
      'userdetails.attribute.name=cd-uor-dep\n' +
      'userdetails.attribute.value=18841\n' +
      'userdetails.attribute.name=sn\n' +
      'userdetails.attribute.value=Higor de Moraes\n' +
      'userdetails.attribute.name=prefixoSuperEstadual\n' +
      'userdetails.attribute.value=8486\n' +
      'userdetails.attribute.name=cd-eqp\n' +
      'userdetails.attribute.value=283586\n' +
      'userdetails.attribute.name=responsabilidadeFuncional\n' +
      'userdetails.attribute.value=8\n' +
      'userdetails.attribute.name=chaveCripto\n' +
      'userdetails.attribute.value=beoNv7n4Kajj3GJzJQE+oQ==\n' +
      'userdetails.attribute.name=chaveFuncionario\n' +
      'userdetails.attribute.value=F4193962\n' +
      'userdetails.attribute.name=tx-cmss-usu\n' +
      'userdetails.attribute.value=ASSESSOR I UT\n' +
      'userdetails.attribute.name=cd-ref-orgc\n' +
      'userdetails.attribute.value=1AUT\n' +
      'userdetails.attribute.name=cd-ior\n' +
      'userdetails.attribute.value=1\n' +
      'userdetails.attribute.name=mobile\n' +
      'userdetails.attribute.value=062 996312209\n' +
      'userdetails.attribute.name=sessaoIIB\n' +
      'userdetails.attribute.value=rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwACRgAKbG9hZEZhY3RvckkACXRocmVzaG9sZHhwP0AAAAAAAAx3CAAAABAAAAAHdAAUdGlja2V0VmFsaWRhZGVTZXNzYW91cgACW0Ks8xf4BghU4AIAAHhwAAAABExxOu10ABV2ZXJzYW9Ub2tlbkFzc2luYXR1cmF1cQB+AAMAAAAC8PF0AAt0b2tlblNlc3Nhb3VxAH4AAwAAACCU8tMVHUc9E/vhQ4K7dJwGzC8/uD3vrMtmpntB/I5yTHQAB3VzdWFyaW91cQB+AAMAAAAIRjQxOTM5NjJ0AAZ2ZXJzYW90AAExdAAddGltZXN0YW1wVGlja2V0VmFsaWRhZGVTZXNzYW9zcgAOamF2YS5sYW5nLkxvbmc7i+SQzI8j3wIAAUoABXZhbHVleHIAEGphdmEubGFuZy5OdW1iZXKGrJUdC5TgiwIAAHhwAAABcWBHwAd0AAZjaGF2ZXN1cQB+AAMAAAAwfjc33HG86Lh88fgNBMxqC1paxYQ0x6K4gBYqoarkpd9rgJIWbS8G1epIkdb6YGU+eA==\n' +
      'userdetails.attribute.name=cd-inst\n' +
      'userdetails.attribute.value=1\n' +
      'userdetails.attribute.name=cn\n' +
      'userdetails.attribute.value=F4193962 Higor de Moraes\n' +
      'userdetails.attribute.name=cd-cmss-usu\n' +
      'userdetails.attribute.value=14011\n' +
      'userdetails.attribute.name=cd-ncl\n' +
      'userdetails.attribute.value=0\n' +
      'userdetails.attribute.name=nomeUF\n' +
      'userdetails.attribute.value=GO\n' +
      'userdetails.attribute.name=nomeFuncionario\n' +
      'userdetails.attribute.value=HIGOR DE MORAES\n' +
      'userdetails.attribute.name=nomeGuerra\n' +
      'userdetails.attribute.value=HIGOR\n' +
      'userdetails.attribute.name=cd-cli\n' +
      'userdetails.attribute.value=419446404\n' +
      'userdetails.attribute.name=cd-dvs\n' +
      'userdetails.attribute.value=0\n' +
      'userdetails.attribute.name=codigoInstituicao\n' +
      'userdetails.attribute.value=1\n' +
      'userdetails.attribute.name=idSessao\n' +
      'userdetails.attribute.value=G302091544073661\n' +
      'userdetails.attribute.name=cd-tip-idgl\n' +
      'userdetails.attribute.value=F\n' +
      'userdetails.attribute.name=displayname\n' +
      'userdetails.attribute.value=Higor\n' +
      'userdetails.attribute.name=tipoDependencia\n' +
      'userdetails.attribute.value=4'
    );
  },
};
