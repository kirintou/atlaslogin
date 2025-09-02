//model/model.js

const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: {
        type: String,
        index: true,
        
        require: true,
    },
    password: {
        type: String,
        index: true,
        
        require: true,
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;