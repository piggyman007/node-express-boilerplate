const Validator = require('swagger-model-validator');
const SwaggerParser = require('swagger-parser');

function getParserParameters(method, url, swaggerAPI) {
  let decoratedUrl = url.replace(swaggerAPI.basePath, '');
  if (url.endsWith('/')) {
    decoratedUrl = decoratedUrl.substring(0, url.length - 1);
  }

  if (decoratedUrl.indexOf('?') !== -1) {
    decoratedUrl = decoratedUrl.substring(0, decoratedUrl.indexOf('?'));
  }

  return swaggerAPI.mappingPaths[decoratedUrl][method.toLowerCase()].parameters;
}

function mapPath(path, params) {
  let mappingPath = path;
  for (const key in params) {
    mappingPath = mappingPath.replace(/{[\w]+}/, params[key]);
  }
  return mappingPath;
}

function extractSchemaPath(paramater) {
  return {
    type: paramater.type,
    required: paramater.required
  };
}

function extractSchemaBody(paramater) {
  return paramater.schema;
}

module.exports.validate = async (req) => {
  const swaggerAPI = await SwaggerParser.validate(`${__dirname}/../../swagger.yaml`);
  const validator = new Validator(swaggerAPI);

  swaggerAPI.mappingPaths = {};

  for (const path in swaggerAPI.paths) {
    // mapping url with params
    const mappingPath = mapPath(path, req.params);
    swaggerAPI.mappingPaths[mappingPath] = swaggerAPI.paths[path];
  }

  const paramaters = getParserParameters(req.method, req.originalUrl, swaggerAPI);

  for (const paramater of paramaters) {
    let data;
    let schema;

    if (paramater.in === 'path') {
      schema = extractSchemaPath(paramater);
      data = req.params[paramater.name];
    } else if (paramater.in === 'body') {
      schema = extractSchemaBody(paramater);
      data = req.body;
    } else {
      continue;
    }

    const result = validator.validate(data, schema);
    if (!result.valid) {
      return result;
    }
  }

  const getParameters = paramaters.filter(item => item.in === 'query');
  if (getParameters.length > 0) {
    const schema = {
      type: 'object',
      required: [],
      properties: {}
    };
    const data = {};

    for (const parameter of getParameters) {
      if (parameter.required) {
        schema.required.push(parameter.name);
      }

      schema.properties[parameter.name] = parameter;

      if (parameter.enum && parameter.enum.length > 0) {
        data[parameter.name] = req.query[parameter.name];
      } else {
        data[parameter.name] = req.query[parameter.name] || '';
      }
    }

    const result = validator.validate(data, schema);
    if (!result.valid) {
      return result;
    }
  }

  return { valid: true };
};
