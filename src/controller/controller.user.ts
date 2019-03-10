import User from "../models/model.user";
import { Request, Response } from "express";
import * as mongoose from "mongoose";
import { secret } from "../utils/config";
const jwt = require('jsonwebtoken');
const isObjectId = mongoose.Types.ObjectId.isValid;

export class UserController {
  public addNewUser(req: Request, res: Response) {
    const { body } = req;
    let newUser = new User(body);
    newUser
      .save()
      .then(user => res.send(user))
      .catch(err => res.status(403).send(err));
  }
  public getUser(req: Request, res: Response) {
    const { query } = req.params;
    const promise = isObjectId(query)
      ? User.findById(query)
      : User.find({ username: query });
    console.log(isObjectId(query));
    promise.then(user => res.send(user)).catch(err => res.status(403).send(err));
  }
  public async updateUser(req: any, res: Response) {
    try {
      const { query: _id } = req.params;
      const { userDetail: user } = req;
      const nextUser = await User.findById({_id});
      if(nextUser._id.equals(user._id)) {
        const result = User.findOneAndUpdate({_id}, req.body, {new: true});
        res.send(result);
      }
    } catch(err) {
      res.status(403).send({message: "Invalid permission"});
    }
  }
  public getAllUser(req: Request, res: Response) {
    const { limit = 10, page = 1 } = req.query;
    const skips = limit * (page - 1);
    User.find().skip(skips).limit(parseInt(limit))
      .then(users => res.send(users))
      .catch(err => res.send(err))
  }
  public deleteUser(req: Request, res: Response) {
    const { query: _id } = req.params;
    User.deleteOne({_id})
      .then(msg => res.send(msg))
      .catch(err => res.status(400).send(err))
  }
  // public deleteAll(req: Request, res: Response) {
  //   User.deleteMany({})
  //     .then(msg => res.send(msg))
  //     .catch(err => res.send(err))
  // }
  public async userLogin(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({
        username
      });
      const { email, _id } = user;
      if(!user) {
        res.status(400).send({message: "Invalid username"});
      }
      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) {
        res.status(400).send("Invalid password");
      }
      res.send({username: user.username, token: jwt.sign({_id, username, email}, secret, {expiresIn: "30d"})});
    } catch(err) {
      res.status(400).send(err);
      console.log(err);
    }
    
  }
}
