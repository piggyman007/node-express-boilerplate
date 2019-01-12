const Validator = require('swagger-model-validator');
const _ = require('lodash');
const SwaggerParser = require('swagger-parser');

function getParserParameters(method, url, swaggerAPI) {
  let decoratedUrl = url.replace(swaggerAPI.basePath, '');
  if (url.endsWith('/')) {
    decoratedUrl = decoratedUrl.substring(0, url.length - 1);
  }

  return swaggerAPI.paths[decoratedUrl][method.toLowerCase()].parameters;
}

module.exports.validate = async (req) => {
  const swaggerAPI = await SwaggerParser.validate('swagger.yaml');
  const paramaters = getParserParameters(req.method, req.originalUrl, swaggerAPI);
  const { schema } = paramaters[0];
  const body = _.cloneDeep(req.body);
  const validator = new Validator(swaggerAPI);

  return validator.validate(body, schema);
};
