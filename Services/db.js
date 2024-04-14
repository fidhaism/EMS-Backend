// To connect node with mongodb

// We need to install mongoose --> npm i mongoose

//1. import mongoose
const mongoose = require('mongoose')

//2. Connect with Mongodb
mongoose.connect('mongodb://localhost:27017/ems-backend') //compass->3 dots ->copy connection string

//3. Create Model(collection - employees) and Schema(Fields & datatype - id:string,name:string,age:string,) of your data
const Employee = mongoose.model('Employee', {
    id:String,
    name: String,  
    age: String,
    designation: String,
    salary: String

})
module.exports={Employee} //export Employee Model to use in files