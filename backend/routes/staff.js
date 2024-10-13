const { Router } = require("express");
const { Student, Gender, Contact } = require("../model/student");
const { where, Model } = require("sequelize");

const router = Router();

router.post("/add_student", async (req, res) => {
  const { name, dob, address, email, phone, gender } = req.body;

  const gender_ = await Gender.findOne({
    where: {
      gender: gender,
    },
  });
  const contact = await Contact.create({
    address: address,
    email: email,
    phone: phone,
  });
  const student = await Student.create({
    name: name,
    dob: dob,
    gender_id: gender_.id,
    contact_id: contact.id,
  });

  console.log(student.id);
  res.send(student);
});

router.get("/", async (req, res) => {
  // const student = await Student.findAll({
  //   include: Contact ,
  // });
  // res.send(student);
  const gender = await Gender.findAll({
    where: {
      gender: "Male",
    },
    include: Student,
  });
  res.send(gender);
});
module.exports = router;
