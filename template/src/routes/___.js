const express = require('express');
const {{camelCase operation_name}} = require('../services/{{operation_name}}');

const router = new express.Router();

{{#each operation}}
  {{#each this.path}}
    {{#validMethod @key}}
/**
 {{#each ../descriptionLines}}
 * {{{this}}}
 {{/each}}
 */
router.{{@key}}('{{../../subresource}}', async (req, res) => {
  const options = {
    {{#each ../parameters}}
      {{#equal this.in "query"}}
    {{../name}}: req.query.{{../name}}{{#unless @last}},{{/unless}}
      {{/equal}}
      {{#equal this.in "path"}}
    {{../name}}: req.params.{{../name}}{{#unless @last}},{{/unless}}
      {{/equal}}
      {{#match @../key "(post|put)"}}
        {{#equal ../in "body"}}
    {{../name}}: req.body.{{../name}}{{#unless @last}},{{/unless}}
        {{/equal}}
      {{/match}}
    {{/each}}
  };

  try {
    const result = await {{camelCase ../../../operation_name}}.{{../operationId}}(options);
    {{#ifNoSuccessResponses ../responses}}
    return res.responseSuccess(200, result.data);
    {{else}}
    return res.responseSuccess(result.status || 200, result.data);
    {{/ifNoSuccessResponses}}
  } catch (err) {
    {{#ifNoErrorResponses ../responses}}
    return res.responseError(new Error('Server Error'));
    {{else}}
    return res.responseError(err);
    {{/ifNoErrorResponses}}
  }
});

    {{/validMethod}}
  {{/each}}
{{/each}}
module.exports = router;
