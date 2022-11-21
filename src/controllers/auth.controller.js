import User from "../../models/user.model.js";
import genToken from "../../utils/gen.token.js";
import bcrypt from "bcryptjs";

export default class AuthController {
  static async signup(req, res) {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password:hashedPassword, role });
    const token = genToken(user.uuid);
    res.status(201).json({
      token,
    });
  }

  static async login(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }
    const token = genToken(user.uuid);
    res.status(200).json({
      token,
    });
  }
}