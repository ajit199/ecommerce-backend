const asyncHandler = require("../utils/asyncHandler.js");
const ApiError = require("../utils/ApiError.js");
const Category = require("../models/category.model.js");
const User = require("../models/user.model.js");

const getCategories = asyncHandler(async (req, res) => {
  // assign default values to query parameters.
  const { skip = "0", limit = "6" } = req.query;

  // check variables and their types.
  if (skip && limit) {
    const intSkip = parseInt(skip);
    const intLimit = parseInt(limit);

    if (isNaN(intSkip) || isNaN(intLimit)) {
      throw new ApiError(401, "invalid query parameters.");
    }
  }

  // get data from DB.
  const categories = await Category.findAll({
    offset: +skip,
    limit: +limit,
  });

  const totalCategory = await Category.count();

  return res.json({
    data: categories,
    total: totalCategory,
  });
});

const getUserCategories = asyncHandler(async (req, res) => {
  return res.json({ data: req.user?.categories_id });
});

const updateUserCategories = asyncHandler(async (req, res) => {
  const { catId } = req.body;
  const { id } = req.user;

  const user = await User.findOne({
    where: {
      id,
    },
  });

  let categories_id = user?.dataValues?.categories_id;

  if (categories_id) {
    if (categories_id[catId]) {
      delete categories_id[catId];
    } else {
      categories_id = {
        ...categories_id,
        [catId]: true,
      };
    }
  } else {
    categories_id = {
      [catId]: true,
    };
  }

  await User.update(
    { categories_id: categories_id },
    {
      where: {
        id,
      },
      returning: true,
      plain: true,
    }
  );
  return res.json({
    success: true,
    message: "User categories updated successfully.",
  });
});

module.exports = { getCategories, getUserCategories, updateUserCategories };
