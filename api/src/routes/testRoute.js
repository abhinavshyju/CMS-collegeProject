const { Router } = require("express");

const router = Router();

const validateUser = (req, res, next) => {
  try {
    const role = req.body.role;
    if (["admin", "staff", "faculty"].includes(role)) {
      console.log(role);
      next();
    } else {
      res.send("Access  denied!");
    }
  } catch (error) {}
};

router.get("/", (req, res) => {
  res.json("This is a test route ");
});

router.post("/", validateUser, (req, res) => {
  const { email, password } = req.body;

  res.send(req.body);
});
module.exports = router;
