const StudentModel = require("./src/models/stundentModel");
const UniversityDetailsModel = require("./src/models/universityDetailsModel");

const test = async () => {
  const result = await StudentModel.findOne({
    where: {
      dob: dob,
    },
    include: UniversityDetailsModel,
  });
  console.log(result);
};
