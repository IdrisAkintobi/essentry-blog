import jwt from "jsonwebtoken";

function genToken(data) {
  return jwt.sign({id: data}, process.env.SECRET, {
    expiresIn: "12h",
  });
}

export default genToken;
