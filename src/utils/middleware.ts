import { Response } from "express";
const jwt = require('jsonwebtoken');
import { secret } from "../utils/config";

export const isAuth = async (req: any, res: Response, next) => {
  try {
    let token = req.headers.authorization;
    if(!token) {
      res.status(403);
      res.send({message: "Permission not found"});
    }
    // Check if token is valid and not expired
    if(token.startsWith("Bearer")) {
      token = token.split(" ")[1];
    }
    const user = await jwt.verify(token, secret);
    req.userDetail = user;
    next();
  } catch(err) {
    res.send(err);
  }
}