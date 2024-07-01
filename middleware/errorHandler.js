const {constants} = require('../constant')
const errorHandler = (err,req,res,next)=>{
   const statusCode = res.statusCode?res.statusCode:500;
   switch(statusCode){
    case constants.VALIDATION_ERROR:
        res.status(400).json({
            title:"Validation failed",
            message:err.message,
            stackTrace:err.stack
        })
        break;
    case constants.NOT_FOUND:
        res.status(404).json({
            title:"Not found",
            message:err.message,
            stackTrace:err.stack
        })
        break;
    case constants.UNAUTHORIZED:
            res.status(404).json({
                title:"unauthorized",
                message:err.message,
                stackTrace:err.stack
            })
            break;    
     case constants.FORBIDDEN:
                res.status(404).json({
                    title:"forbidden",
                    message:err.message,
                    stackTrace:err.stack
                })
            break;
    case constants.SERVER_ERROR:
                res.status(404).json({
                    title:"server error",
                    message:err.message,
                    stackTrace:err.stack
                })
            break;        
    default:
        console.log("no error all good");
        break;

   }
  
  
}


module.exports = errorHandler