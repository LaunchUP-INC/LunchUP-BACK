const getSchool = require("../controllers/getSchool");

const getSchoolsHandler = async (req, res, error) => {
  try {
    const schools = await getSchool();
    return res.status(200).json({ schools });
  } catch (error) {
    next(error);
  }
};

module.exports = getSchoolsHandler;
