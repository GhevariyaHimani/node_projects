const {contacts} = require("../constants")
const errorhandle = (err, req, res, next) => {
    // for show error message in json format
    const statuscode = res.statuscode ? res.statuscode : 500;
    switch(statuscode) {
        case contacts.VALIDATION_ERROR:
            res.json({
                title : "validation failed", 
                message : err.message, 
                stackTrace : err.stack
            });
            break;
        case contacts.NOT_FOUND:
            res.json({
                title : "page not found", 
                message : err.message, 
                stackTrace : err.stack
            });
            break;
        case contacts.UNAUTHORIZED:
            res.json({
                title : "unauothorized error", 
                message : err.message, 
                stackTrace : err.stack
            });
            break;
        case contacts.FORBIDDEN:
            res.json({
                title : "FORBIDDEN", 
                message : err.message, 
                stackTrace : err.stack
            });
            break;
        case contacts.SERVER_ERROR:
            res.json({
                title : "server error", 
                message : err.message, 
                stackTrace : err.stack
            });
            break;
        default : 
            // console.log("no error, all good ! ");;
            // break;
    }   
}

module.exports = errorhandle;