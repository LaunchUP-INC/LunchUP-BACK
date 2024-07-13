const getSchool = require("../controllers/getSchool");

const getSchoolsHandler = async (req, res) => {
  try {
    const schools = await getSchool();
    return res.status(200).json({ schools });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getSchoolsHandler;
