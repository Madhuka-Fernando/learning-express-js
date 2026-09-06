export const registerError = (error = []) => {
  // Create an object to hold error messages
  const errorMsg = {};

  // Loop through each error
  for (const e of error) {
    // If the error message for the field already exists, append the new message
    if (errorMsg[e.path] !== undefined) {
      //
      const msg = `${errorMsg[e.path]} ,${e.msg}`;
      errorMsg[e.path] = msg;
    } else {
      // If the error message for the field does not exist, create it
      errorMsg[e.path] = e.msg;
    }
  }

  return errorMsg;
};
