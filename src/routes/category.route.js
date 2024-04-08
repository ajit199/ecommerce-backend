const { Router } = require("express");
const {
  getCategories,
  getUserCategories,
  updateUserCategories,
} = require("../controllers/category.controller.js");
const verifyJWT = require("../middlewares/auth.middleware.js");

const router = Router();

router.route("/get-categories").get(verifyJWT, getCategories);
router.route("/get-user-categories").get(verifyJWT, getUserCategories);
router.route("/update-user-categories").patch(verifyJWT, updateUserCategories);

module.exports = router;
