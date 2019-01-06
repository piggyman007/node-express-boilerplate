const express = require('express');
const contract = require('../services/contract');

const router = new express.Router();

/**
 * Owner sign contract
 */
router.post('/owner/sign', async (req, res) => {
  const options = {
    body: req.body.body
  };

  try {
    const result = await contract.postContractOwnerSign(options);
    return res.responseSuccess(result.status || 200, result.data);
  } catch (err) {
    return res.responseError(err);
  }
});

/**
 * Tenant sign contract
 */
router.post('/tenant/sign', async (req, res) => {
  const options = {
    body: req.body.body
  };

  try {
    const result = await contract.postContractTenantSign(options);
    return res.responseSuccess(result.status || 200, result.data);
  } catch (err) {
    return res.responseError(err);
  }
});

module.exports = router;
