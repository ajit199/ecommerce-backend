const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const ApiError = require("./ApiError");
async function generateAccessToken(user) {
  try {
    // if (userExists?.dataValues?.id) {
    //   const [count, updatedUser] = await User.update(
    //     {
    //       metaData: {
    //         ...tokens,
    //         refresh_token: tokens?.refresh_token
    //           ? tokens?.refresh_token
    //           : userExists?.dataValues?.metaData?.refresh_token,
    //       },
    //       tokenIssuedAt: new Date(),
    //     },
    //     {
    //       where: {
    //         id: userExists.dataValues.id,
    //       },
    //       returning: true,
    //       plain: true,
    //     }
    //   );
    //   currentUser = updatedUser;
    // } else {
    //   currentUser = await User.create({
    //     name: userName,
    //     email: userEmail,
    //     metaData: tokens,
    //     tokenIssuedAt: new Date(),
    //   });
    // }

    const accessToken = jwt.sign(
      {
        id: user?.dataValues?.id,
        email: user?.dataValues?.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );

    return { accessToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access token"
    );
  }
}

module.exports = generateAccessToken;
