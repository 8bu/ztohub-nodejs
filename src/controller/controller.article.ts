import Article from "../models/model.article";
import { Request, Response } from "express";
import * as mongoose from "mongoose";
const isObjectId = mongoose.Types.ObjectId.isValid;

export class ArticleController {
  public addNewArticle(req: Request, res: Response) {
    // TODO: Get username from token login 
    const { body } = req;
    let data = body;
    let newArticle = new Article(data);
    newArticle
      .save()
      .then(article => res.send(article))
      .catch(err => {res.status(400).send(err); console.log(err)});
  }
  public getArticle(req: Request, res: Response) {
    const { query } = req.params;
    const promise = isObjectId(query)
      ? Article.findById(query)
      : Article.find({ slug: query });
    console.log(isObjectId(query));
    promise.then(article => res.send(article)).catch(err => res.status(400).send(err));
  }
  public async updateArticle(req: any, res: Response) {
    try {
      const { query: _id } = req.params;
      const { userDetail: user } = req;
      const article = await Article.findbyId(_id);
      if(article.author_id.equals(user._id)) {
        const result = await Article.findOneAndUpdate({_id}, req.body, {new: true});
        res.send(result);
      } else {
        res.status(403).send({message: "Invalid permission"});
      }
    } catch(err) {
      res.status(403).send({message: "Invalid permission"});
    }
      
  }
  public getAllArticle(req: Request, res: Response) {
    const { limit = 10, page = 1 } = req.query;
    const skips = limit * (page - 1);
    Article.find().skip(skips).limit(parseInt(limit))
      .then(articles => res.send(articles))
      .catch(err => res.status(403).send(err))
  }
  public async deleteArticle(req: any, res: Response) {
    try {
      const { query: _id } = req.params;
      const { userDetail: user } = req;
      const article = await Article.findbyId(_id);
      if(article.author_id.equals(user._id)) {
        const result = await Article.deleteOne({_id});
        res.send(result);
      } else {
        res.status(403).send({message: "Invalid permission"});
      }
    } catch(err) {
      res.status(403).send(err);
    }
    
  }
  // public deleteAll(req: Request, res: Response) {
  //   Article.deleteMany({})
  //     .then(msg => res.send(msg))
  //     .catch(err => res.send(err))
  // }
}
