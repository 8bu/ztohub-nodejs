import Article from "../models/model.article";
import { Request, Response } from "express";
import * as mongoose from "mongoose";
const isObjectId = mongoose.Types.ObjectId.isValid;

export class ArticleController {
  public addNewArticle(req: Request, res: Response) {
    // TODO: Get username from token login 
    const { body } = req;
    // const data = {...body, author_id: auth_id};
    let data = body;
    let newArticle = new Article(data);
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
    promise.then(article => res.send(article)).catch(err => res.send(err));
  }
  public updateArticle(req: Request, res: Response) {
    const { query: _id } = req.params;
    Article.findOneAndUpdate({_id}, req.body, {new: true})
      .then(article => res.send(article))
      .catch(err => res.send(err))
  }
  public getAllArticle(req: Request, res: Response) {
    const { limit = 10, page = 1 } = req.query;
    const skips = limit * (page - 1);
    Article.find().skip(skips).limit(parseInt(limit))
      .then(articles => res.send(articles))
      .catch(err => res.send(err))
  }
  public deleteArticle(req: Request, res: Response) {
    const { query: _id } = req.params;
    Article.deleteOne({_id})
      .then(msg => res.send(msg))
      .catch(err => res.send(err))
  }
  // public deleteAll(req: Request, res: Response) {
  //   Article.deleteMany({})
  //     .then(msg => res.send(msg))
  //     .catch(err => res.send(err))
  // }
}
