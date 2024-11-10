const { default: mongoose } = require("mongoose");
const Classe = require("../model/classesModel"); // Import the classes model

exports.postclasses = async (req, res) => {
  try {
    const newClassData = req.body;
    const newClass = new Classe(newClassData); // Create a new instance of the model mean to insert data
    const result = await newClass.save(); // Save the document to the database
    res.send(result);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error creating new class", details: error.message });
  }
};
exports.getclasses = async (req, res) => {
  try {
    const query = { status: "approved" };
    const classesdata = await Classe.find(query); // Fetch all documents
    res.status(200).json(classesdata); // Send response as JSON
  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getclassesemail = async (req, res) => {
  try {
    const email = req.params.email; // Get email from request parameters

    const result = await Classe.find({ instructorEmail: email }); // Fetch classes based on instructor's email
    if (result.length == 0) {
      console.log("no email record is exist");
      res.send("this email is no record is exist in database");
    } else {
      return res.status(200).send(result); // Send the result
    }
  } catch (error) {
    console.error("Error fetching classes:", error); // Log any errors to console
    res
      .status(500)
      .send({ error: "An error occurred while fetching classes." }); // Send error response
  }
};

exports.getclasses_manage = async (req, res) => {
  try {
    const result = await Classe.find();
    res.send(result);
  } catch (error) {
    console.error("Error fetching classes:", error); // Log any errors to console
    res
      .status(500)
      .send({ error: "An error occurred while fetching classes." }); // Send error response
  }
};
//to update classes status and reason
exports.patchclasses = async (req, res) => {
  try {
    // Get the 'id' from the URL params
    const id = req.params.id; // Use req.params to get the ID from the URL, not req.body

    // Get the status and reason from the request body
    const { status, reason } = req.body;

    console.log(id, status, reason);

    // Find the document by 'id' and update the status and reason
    const result = await Classe.updateOne(
      { _id: id }, // Use the correct filter to find the document by ID
      { $set: { status, reason } } // Use the $set operator to update fields
    );
    if (result.modifiedCount > 0) {
      // Send the updated document details back in the response
      res.send({ message: "Document updated successfully", result });
    } else {
      // If no document was updated (maybe the ID doesn't exist)
      res.status(404).send({ error: "Document not found or no change made" });
    }
  } catch (error) {
    console.error("Error updating:", error);
    res.status(500).send({ error: "An error occurred while updating data" });
  }
};
//get approved-classes below
exports.getapproved_classes = async (req, res) => {
  const query = { status: "approved" };
  const result = await Classe.find(query);
  res.send(result);
  console.log(query);
};

exports.getsingle_class = async (req, res) => {
  const id = req.params.id;
  const querry = { _id: id };
  const result = await Classe.findOne(querry);
  res.send(result);
  console.log(result, "hi not");
};

exports.putsingle_class = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await Classe.updateOne(
      { _id: id },
      {
        $set: {
          name: updatedData.name,
          image: updatedData.image,
          availableSeats: updatedData.availableSeats,
          price: updatedData.price,
          videoLink: updatedData.videoLink,
          description: updatedData.description,
          instructorName: updatedData.instructorName,
          instructorEmail: updatedData.instructorEmail,
          status: updatedData.status,
          submitted: updatedData.submitted,
          totalEnrolled: updatedData.totalEnrolled,
          reason: updatedData.reason,
        },
      }
    );
    res.send(result);

    //   const {
//     name,
//     image,
//     availableSeats,
//     price,
//     videoLink,
//     description,
//     instructorName,
//     instructorEmail,
//     status,
//     submitted,
//     totalEnrolled,
//     reason,
//   } = req.body;
//   const id = req.params.id;
//   const result = await Classe.updateOne(
//     { _id: id },
//     {
//       $set: {
//         name,
//         image,
//         availableSeats,
//         price,
//         videoLink,
//         description,
//         instructorName,
//         instructorEmail,
//         status,
//         submitted,
//         totalEnrolled,
//         reason,
//       },
//     }
//   );
//   res.send(result);
//   console.log(result);


  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while updating the class");
  }

};
