import Article from "../models/model.article";
import { Request, Response } from "express";
import * as mongoose from "mongoose";
const isObjectId = mongoose.Types.ObjectId.isValid;

export class ArticleController {
  public addNewArticle(req: Request, res: Response) {
    let newArticle = new Article(req.body);
    newArticle
      .save()
      .then(article => res.send(article))
      .catch(err => res.send(err));
  }
  public getArticle(req: Request, res: Response) {
    const { query } = req.params;
    const promise = isObjectId(query)
      ? Article.findById(query)
      : Article.find({ slug: query });
    console.log(isObjectId(query));
    promise.then(dog => res.send(dog)).catch(err => res.send(err));
  }
  public getAllArticle(req: Request, res: Response) {}
}
