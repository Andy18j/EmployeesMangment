const express = require("express")

const {dbModel} = require("../model/dashboard.model")


const dbRouter = express.Router()
//post employees data
dbRouter.post("/employees",async(req,res)=>{
    try{
        const employee = await dbModel.create(req.body)
        await employee.save()
        res.status(201).json({msg:"Employess Data Posted SucessFully.."})

    }
    catch(err){
        console.log(err)
        res.status(501).json({msg:"Something Went Wrong To Posting The Employess Data.."})
    }
})

//retrive employees data
dbRouter.get("/employees",async(req,res)=>{
    try{
        let data = await dbModel.find();
        res.status(201).json({msg:"users data are here",user:data})
    }
    catch(err){
        res.status(501).json({msg:"user are not found"})
        console.log(err.err)
    }

})

// Delete employee route
dbRouter.delete("/employees/:id", async (req, res) => {
    try {
      const employeeId = req.params.id;
      await dbModel.findByIdAndDelete(employeeId);
  
      res.status(200).json({ msg: "Employee deleted successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Something went wrong deleting employee" });
    }
  });

  // Update employee details here
dbRouter.put("/employees/:id", async (req, res) => {
    try {
      const employeeId = req.params.id;
      const updatedEmployee = await dbModel.findByIdAndUpdate(employeeId, req.body, { new: true });
  
      res.status(200).json({ employee: updatedEmployee, msg: "Employee details updated successfully",employeeId});
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Something went wrong updating employee details" });
    }
  });


 
// Search employees by first name
dbRouter.get("/employees/:firstName", async (req, res) => {
    try {
        const firstName = req.params.firstName;
        const employees = await dbModel.find({ FirstName: { $regex: new RegExp(firstName, 'i') } });

        res.status(200).json({ employees });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Something went wrong searching employees by first name" });
    }
});

// Get employees sorted by salary
dbRouter.get("/employees/sort/salary", async (req, res) => {
    try {
      const employees = await dbModel.find().sort({ salary: 1 });
  
      res.status(200).json({ employees });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Something went wrong fetching sorted employees" });
    }
  });
  
// Get paginated list of employees
dbRouter.get("/employees/:page", async (req, res) => {
    try {
        const pageSize = 5; 
        const page = parseInt(req.params.page) || 1;
        const skip = (page - 1) * pageSize;

        const employees = await dbModel.find().skip(skip).limit(pageSize);

        res.status(200).json({ employees, currentPage: page });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Something went wrong fetching paginated employees" });
    }
});



  
module.exports = {
    dbRouter
}