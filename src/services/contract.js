/**
 * @param {Object} options
 * @param {Object} options.body 
 * @throws {Error}
 * @return {Promise}
 */
module.exports.postContractOwnerSign = async (options) => {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // }
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new Error({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // })

  return {
    status: 200,
    data: 'postContractOwnerSign ok!'
  };
};

/**
 * @param {Object} options
 * @param {Object} options.body 
 * @throws {Error}
 * @return {Promise}
 */
module.exports.postContractTenantSign = async (options) => {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // }
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new Error({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // })

  return {
    status: 200,
    data: 'postContractTenantSign ok!'
  };
};

