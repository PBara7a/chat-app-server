const STATUS_MESSAGES = {
  200: "success",
  201: "success",
  400: "fail",
  401: "fail",
  403: "fail",
  404: "fail",
  500: "error",
};

const sendDataResponse = (res, statusCode, payload) => {
  return res.status(statusCode).json({
    status: STATUS_MESSAGES[statusCode],
    data: payload,
  });
};

const sendMessageResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({
    status: STATUS_MESSAGES[statusCode],
    message,
  });
};

module.exports = {
  sendDataResponse,
  sendMessageResponse,
};
