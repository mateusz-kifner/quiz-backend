module.exports = (message, code = 500, data = {}) => {
    let error = new Error(message);
    error.status = code;
    error.data = data;
    return error;
};
