const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const ktoolkit = require('ktoolkit');
const config = require('../../config/dev-server');
const { URL } = require('url');

const logger = ktoolkit.logger.output;

const app = express();
app.use(express.static('dist'));
app.use(bodyParser.raw({
  type: '*/*'
}));

const proxyTableKeys = Object.keys(config.proxyTable);

proxyTableKeys.forEach(prefix => {
  const proxyInfo = config.proxyTable[prefix];
  const target = proxyInfo.target;
  logger.info(`Create proxy on ${prefix} -> ${target}`);

  app.all(`${prefix}*`, (req, res) => {
    const method = req.method;
    const url = req.originalUrl;
    const headers = makeHeaderObjects(req.rawHeaders);
    const targetUrl = new URL(target);
    const body = req.body;

    logger.info(`${method} ${url}`);

    if ( proxyInfo.changeOrigin ) {
      headers.Host = targetUrl.host;
    }

    axios({
      url,
      baseURL: target,
      method,
      headers,
      responseType: 'arraybuffer',
      data: body
    })
    .then(proxyResponse => {
      logger.info(`${proxyResponse.status} ${proxyResponse.statusText}`);
      res.set(proxyResponse.headers);
      res.send(proxyResponse.data);
    })
    .catch(e => {
      logger.error(`${e.response.status} ${e.response.statusText}`);
      res.status(e.response.status).send(e.response.statusText);
    });
  });
});

app.listen(config.server.port, config.server.host, () => {
  logger.info(`Server listened on ${config.server.host}:${config.server.port}`);
});

function makeHeaderObjects(rawHeaders) {
  const header = {};

  let key = null;
  for ( const value of rawHeaders ) {
    if ( key === null ) {
      key = value;
    }
    else {
      header[key] = value;
      key = null;
    }
  }

  return header;
}
