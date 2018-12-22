const Validator = require('swagger-model-validator');
const _ = require('lodash');
const swagger = require('../../swagger.json');

function getParserParameters(method, url) {
  let decoratedUrl = url.replace(swagger.basePath, '');
  if (url.endsWith('/')) {
    decoratedUrl = decoratedUrl.substring(0, url.length - 1);
  }

  return swagger.paths[decoratedUrl][method.toLowerCase()].parameters;
}

function validate(req) {
  const paramaters = getParserParameters(req.method, req.originalUrl);
  const { schema } = paramaters[0];
  const body = _.cloneDeep(req.body);
  const validator = new Validator(swagger);

  if (schema.$ref) {
    const definitionKey = schema.$ref.replace('#/definitions/', '');
    return validator.validate(body, swagger.definitions[definitionKey]);
  }

  return validator.validate(body, schema);
}

module.exports = {
  validate,
};
