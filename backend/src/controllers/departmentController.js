import departmentModel from "../models/department.model.js";
//add dept
export const addDepartment = async(req,res)=>{
  console.log(req.body);
    try{
        const{name,description}=req.body;
        const dept=new departmentModel({name,description});
        await dept.save();
        res.status(201).json({message:"Department added successfully",department: dept});
    }
    catch(error){
        res.status(500).json({message:"Failed to add department",error:error.message});
    }
};
//change description
export const updateDepartmentDescription=async(req,res)=>{
    try{
        const {deptId}=req.params;
        const {description}=req.body;
        const dept=await departmentModel.findByIdAndUpdate(
            deptId,
            {description},
            {new:true}
        );
        if (!dept) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.json({ message: 'Description updated', department: dept });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update description', error: error.message });
  }
};
//get dept id
export const getDepartmentById=async(req,res)=>{
    try{
        const{deptId}=req.params;
    const dept = await departmentModel.findById(deptId);
    if (!dept) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.json(dept);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get department', error: error.message });
  }
};
