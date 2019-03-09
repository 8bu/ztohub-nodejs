import Category from "../models/model.category";
import { Request, Response } from "express";
import * as mongoose from "mongoose";
const isObjectId = mongoose.Types.ObjectId.isValid;

export class CategoryController {
  public addNewCategory(req: Request, res: Response) {
    const { body } = req;
    let newCategory = new Category(body);
    newCategory
      .save()
      .then(category => res.send(category))
      .catch(err => res.send(err));
  }
  public getCategory(req: Request, res: Response) {
    const { query } = req.params;
    const promise = isObjectId(query)
      ? Category.findById(query)
      : Category.find({ categoryname: query });
    console.log(isObjectId(query));
    promise.then(category => res.send(category)).catch(err => res.send(err));
  }
  public updateCategory(req: Request, res: Response) {
    const { query: _id } = req.params;
    Category.findOneAndUpdate({_id}, req.body, {new: true})
      .then(category => res.send(category))
      .catch(err => res.send(err))
  }
  public getAllCategory(req: Request, res: Response) {
    const { limit = 10, page = 1 } = req.query;
    const skips = limit * (page - 1);
    Category.find().skip(skips).limit(parseInt(limit))
      .then(categories => res.send(categories))
      .catch(err => res.send(err))
  }
  public deleteCategory(req: Request, res: Response) {
    const { query: _id } = req.params;
    Category.deleteOne({_id})
      .then(msg => res.send(msg))
      .catch(err => res.send(err))
  }
  // public deleteAll(req: Request, res: Response) {
  //   Category.deleteMany({})
  //     .then(msg => res.send(msg))
  //     .catch(err => res.send(err))
  // }
}
