const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
Schema = mongoose.Schema;
var UserSchema = new Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phonenumber:{
        type:Number,
        required:true,
        unique:true
    },
    password:{

        type:String,
        required:true,
        
    }
});
UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
UserSchema.methods.compareEmail = function(email) {
    return email;
  };

module.exports = mongoose.model('User', UserSchema);
