 var config= require('./dbconfig')
 const sql=require ('mssql')
 

async function getEmployee(){
     try{
         let pool = await sql.connect(config)
         let information= await pool.request().query("Select * from Employee");
         return information.recordsets
     }
     catch(error){
         console.log(error)
     }
 }

 async function getOneEmployee(EmpNo){
    try{
        let pool = await sql.connect(config)
        let information= await pool.request()
        .input('input_parameter',sql.Int,EmpNo)
        .query("Select * from Employee where EmpNo= @input_parameter");
        return information.recordsets
    }
    catch(error){
        console.log(error)
    }
}

async function addEmployee(employee){
    try{
        let pool = await sql.connect(config)
        let information= await pool.request()
        .input('EmpNo',sql.Int,employee.EmpNo)
        .input('EmpName', sql.VarChar,employee.EmpName)
        .input('EmpSal',sql.Int,employee.EmpSal)
        .query('Insert into Employee (EmpNo, EmpName, EmpSal) values (@EmpNo,@EmpName,@EmpSal)')
        return information.recordsets
    }
    catch(err){
        console.log(err)
    }
}

 module.exports=
 {getEmployee: getEmployee,
 getOneEmployee: getOneEmployee,
addEmployee: addEmployee}