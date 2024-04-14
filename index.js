
// 1.import express
const express = require('express')

// 2. import cors
const cors = require('cors')

const logic = require('./Services/logic');


// 3. Create a backend app using expess
const emsServer = express() //emsServer is the backend app
//Creates an Express application. The express() function is a top-level function exported by the express module.

// 4. Connect frontend port using CORS
emsServer.use(cors({        //creates an object whose key is 'origin' and value is the fronttend port
    origin: 'http://localhost:5173'  // always remove the last slash of the domain while copy pasting 'http://localhost:5173/'
}))

// 5. Convert json data into js
emsServer.use(express.json()) //returns middleware that only parses json

// 6. create a port for backend
emsServer.listen(8000, () => {
    console.log('emsServer listening on port 8000')  //ensures that backend is at running stage at specified port
})
// http://localhost:8000
emsServer.get('/', (req, res) => {
    res.send('Hello World! Welcome to EMS Server')
})

//http://localhost:8000/api/get-all-employee
emsServer.get('/api/get-all-employee', (req, res) => {
    console.log('get-all-employee request');
    logic.getEmployees().then((response) => {
        console.log('getEmployees response:', response);
        res.status(response.statusCode).json(response);
    });
});

//http://localhost:8000/api/view-employee

emsServer.get('/api/view-employee/:id', (req, res) => {
    logic.viewEmployee(req.params.id).then((response) => {
        res.status(response.statusCode).json(response);
    })

})

//http://localhost:8000/api/add-employee
emsServer.post('/api/add-employee', (req,res)=>{
    logic.addEmployee(req.body.id,req.body.name,req.body.age,req.body.designation,req.body.salary)
    .then((response)=> {
        res.status(response.statusCode).json(response)
        })
    })

//http://localhost:8000/api/delete-employee
emsServer.delete('/api/delete-employee/:id', (req, res) => {
    logic.deleteEmployee(req.params.id).then((response) => {
        res.status(response.statusCode).json(response);
    })

})

//http://localhost:8000/api/update-employee
emsServer.post('/api/update-employee/:id',(req,res)=>{
    logic.updateEmployee(req.params.id,req.body.id,req.body.name,req.body.age,req.body.designation,req.body.salary)
    .then((response)=> {
        res.status(response.statusCode).json(response)
})
})