const { Gender } = require("./model/student");

const createGender = async () => {
  const gender = await Gender.bulkCreate([
    { gender: "Male" },
    { gender: "Female" },
  ]);
  console.log(gender);
};
createGender();
