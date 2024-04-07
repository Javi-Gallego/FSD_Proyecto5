import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserByMail } from "./login.repository.js";
import { ValidationError } from "../../utils/handleError.js";

export const getLoginService = async (req) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    throw new ValidationError("Email and password are required");
  }

  if (password.length < 6 || password.length > 10) {
    throw new ValidationError(
      "Password must contain between 6 and 10 characters"
    );
  }

  const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

  if (!validEmail.test(email)) {
    throw new ValidationError("Email format is not valid");
  }

  const user = await getUserByMail(email);

  if (!user) {
    throw new ValidationError("Email or password invalid");
  }

  if (!user.is_active) {
    throw new ValidationError(
      "User is not active. Send us an email to reactivate your account."
    );
  }

  const isValidPassword = bcrypt.compareSync(password, user.passwordHash);

  if (!isValidPassword) {
    throw new ValidationError("Email or password invalid");
  }

  const token = jwt.sign(
    {
      userId: user._id,
      userName: user.userName,
      roleName: user.role,
      photo: user.photo,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );

  return token;
};
