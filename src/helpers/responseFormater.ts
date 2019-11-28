
export const returnFormater = ({
    statusCode = 200,
    data = undefined,
  }) => {
    const ret = { statusCode, body: null };
    if (data !== undefined) {
      ret.body = JSON.stringify(data);
    }
  return ret;
};
  
export const errorFactory = ({
  statusCode,
  message,
  errorCode,
  }) => ({ data = undefined } = {}) => returnFormater({
    statusCode,
    data: {
        message,
        errorCode,
        data,
    },
});