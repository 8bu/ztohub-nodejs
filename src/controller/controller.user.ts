import User from "../models/model.user";
import { Request, Response } from "express";
import * as mongoose from "mongoose";
const isObjectId = mongoose.Types.ObjectId.isValid;

export class UserController {
  public addNewUser(req: Request, res: Response) {
    const { body } = req;
    let newUser = new User(body);
    newUser
      .save()
      .then(user => res.send(user))
      .catch(err => res.send(err));
  }
  public getUser(req: Request, res: Response) {
    const { query } = req.params;
    const promise = isObjectId(query)
      ? User.findById(query)
      : User.find({ username: query });
    console.log(isObjectId(query));
    promise.then(user => res.send(user)).catch(err => res.send(err));
  }
  public updateUser(req: Request, res: Response) {
    const { query: _id } = req.params;
    User.findOneAndUpdate({_id}, req.body, {new: true})
      .then(user => res.send(user))
      .catch(err => res.send(err))
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
      .catch(err => res.send(err))
  }
  // public deleteAll(req: Request, res: Response) {
  //   User.deleteMany({})
  //     .then(msg => res.send(msg))
  //     .catch(err => res.send(err))
  // }
}
