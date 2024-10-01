import User from "../models/userModel";
import Role from "../models/roleModel";
import bcrypt from "bcrypt";
import { sign } from "../utils/jwtUtils";
import Verification from "../models/verificationModel";
import { sendMail } from "../kernels/nodemailer";

interface AuthenticatedUser {
  id: number;
  email: string;
  access_token: string;
}

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthenticatedUser> => {
  const user = await User.findOne({ where: { email } });
  if (user && (await bcrypt.compare(password, user.password))) {
    if (user.status === "inactive") {
      throw new Error("User is inactive");
    }
    const role = await Role.findOne({ where: { id: user.role_id } });
    if (!role) {
      throw new Error("Role not found");
    }
    return {
      id: user.id,
      email: user.email,
      access_token: sign(user.id.toString(), role?.name),
    };
  }
  throw new Error("Invalid credentials");
};

export const deleteOtpService = async (otp: string): Promise<any> => {
  const result = await Verification.destroy({ where: { code: otp } });
  return result;
};

export const forgotPwService = async (email: string): Promise<any> => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const sendMailService = async (code: any): Promise<any> => {
  const user = await User.findOne({ where: { email: code.to } });
  if (user) {
    const verification = {
      user_id: user.id,
      code: code.text,
    };
    await Verification.create(verification);
    code.text = `Your verification code is: ${code.text}`;
    const result = sendMail(code);
    return result;
  } else {
    throw new Error("User not found");
  }
};

export const verifyEmailService = async (otp: string): Promise<any> => {
    const result = await Verification.findOne({ where: { code: otp } });
    return result;
};

export const newPasswordService = async (body: any): Promise<any> => {
    const password = await bcrypt.hash(body.password, 10);
    const result = await User.update(
      { password: password },
      { where: { email: body.email } }
    );
    return result;
};
