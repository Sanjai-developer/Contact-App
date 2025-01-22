const { stack } = require("../routes/contactRoutes");
const {constants} = require("../constants");
const errorHandler = (err, req, res, next) => {
    const statuscode = res.statuscode ? res.statuscode : 500;
    switch (statuscode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title :"Validation Failed",
                 message:err.message,
                 stackTrace : err.stack }); // Send a generic error response

            break;
        case constants.NOT_FOUND:
            res.json({
                title :"Not Found", 
                message:err.message,
                stackTrace : err.stack }); // Send a generic error response
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title :"Unauthorized",
                 message:err.message,
                 stackTrace : err.stack }); // Send a generic error response
            break;
        case constants.FORBIDDEN:
            res.json({
                title :"Forbidden",
                 message:err.message,
                 stackTrace : err.stack }); // Send a generic error response
            break;
        case constants.SERVER_ERROR:
            res.json({
                title :"Server Error",
                 message:err.message,
                 stackTrace : err.stack }); // Send a generic error response
            break;
            
        default:

            break;
    }

};

module.exports = errorHandler;
