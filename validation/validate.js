const Joi = require('@hapi/joi');
const authSchema=Joi.object({
    email:Joi.string().email().lowercase().required(),
    fullname:Joi.string().min(2).required(),
    password:Joi.string().min(6).required(),
    phonenumber:Joi.number().min(10).required()  
    
}) 
module.exports={ 
    authSchema
}