
const { default: mongoose } = require('mongoose');
const Classe =require('../model/classesModel')// Import the classes model

exports.postclasses= async (req, res) => {
    try {
      const newClassData = req.body;
      const newClass = new Classe(newClassData); // Create a new instance of the model mean to insert data
      const result = await newClass.save(); // Save the document to the database
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: 'Error creating new class', details: error.message });
    }
  }
exports.getclasses= async(req,res)=>{
    try {
        const query={status: "approved"}
        const classesdata = await Classe.find(query); // Fetch all documents
        res.status(200).json(classesdata); // Send response as JSON
      
      } catch (error) {
        console.error('Error fetching classes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

exports.getclassesemail = async (req, res) => {
  try {
      const email = req.params.email; // Get email from request parameters
      
      const result = await Classe.find({ instructorEmail: email }); // Fetch classes based on instructor's email
      if(result.length==0){
        console.log('no email record is exist')
        res.send('this email is no record is exist in database')
      }
      else{
      return res.status(200).send(result); // Send the result
      }

  } catch (error) {
      console.error('Error fetching classes:', error); // Log any errors to console
      res.status(500).send({ error: 'An error occurred while fetching classes.' }); // Send error response
  }
};

exports.getclasses_manage=async(req,res)=>{
  try{
    const result=await Classe.find()
    res.send(result)
  }catch (error){
    console.error('Error fetching classes:', error); // Log any errors to console
      res.status(500).send({ error: 'An error occurred while fetching classes.' }); // Send error response
  }
}
exports.patchclasses=async(req,res)=>{
  try{
    const id=req.body.id
    const status=req.body.status
    const reason=req.body.reason
    const result=await Classe.updateOne({status:status,reason:reason},{id:id})
    result.save()
    res.send(result)


  }catch (error){
    console.error('error updating')
    res.status(500).send({error:'An error accurred while updating data' })
  }
  
}
