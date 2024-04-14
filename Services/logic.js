//import db.js file
const { response } = require('express');
const db = require('./db')


//Here we define all the functions (adding logic, editing logic, viewing logic...etc)

//1. to get all employees from the database (mongodb)
const getEmployees = () => {
    return db.Employee.find().then(
        (result) => {   //result - all employees details
            if (result) {
                return {
                    statusCode: 200,
                    employees: result
                };
            }
            else {
                return {
                    statusCode: 404,
                    message: 'No data found'
                };
            }
        }
    );
};




//2. To View an employee data from the database

const viewEmployee = (id) => {
    return db.Employee.findOne({ id }).then((result) => {
        if (result) {
            return {
                statusCode: 200,
                employee: result
            }
        } else {
            return {
                statusCode: 404,
                message: 'The Employee with the given ID is not available.'
            };
        }
    }
    );
};

//3. To add a new employee's details to the database
const addEmployee = (id, name, age, designation, salary) => {
    return db.Employee.findOne({id}).then((result) => { //Check if the employee id already exists
        if (result) {
            return {
                statusCode: 401,
                message: 'Employee already exists'
            }
        } 
        else {
            const employeeData = new db.Employee({ id, name, age, designation, salary }) //otherwise save the employee details
            employeeData.save()  //save the employee details
            return{
                   // send response back to the client
                statusCode: 200,
                message: "Employee added successfully"
            }
        }
    })
}

//4. To Delete an employee's details in the database
const deleteEmployee = (id) => {
    return db.Employee.deleteOne({ id }).then((result) => {
        if (result) {
            return {
                statusCode: 200,
                message: 'Employee deleted successfully'
            }
        } else {
            return {
                statusCode: 404,
                message: 'The Employee with the given ID is not available.'
            };
        }
    }
    );
}

//5. To update an employee's details in the database
const updateEmployee = (id,name, age, designation, salary) =>{ 
    //find the employee with the given id
    return db.Employee.findOne({ id }).then((response)=>{ 
        if(response){
            //assign the new employee details into the db
            response.id=id;
            response.name=name;
            response.age=age;
            response.designation=designation;
            response.salary=salary; 
            //to save the updated details in the db
            response.save();
            return {
                statusCode: 200,
                message: 'Employee updated successfully'
            };
        } else{
            return{
                statusCode:404,
                message:'The Employee with the given ID is not available.'

            }
        }
    })
}





module.exports = { getEmployees, 
    viewEmployee, 
    addEmployee, 
    deleteEmployee,
    updateEmployee
};
