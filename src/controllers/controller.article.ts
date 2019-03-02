import * as mongoose from 'mongoose';
import { ArticleSchema } from '../models/model.article';
import { Request, Response } from 'express';

const Article = mongoose.model('Article', ArticleSchema);

export class ArticleController {

  public addNewArticle (req: Request, res: Response) {                
    let newArticle = new Article(req.body);

    newArticle.save((err, article) => {
      if(err){
          res.send(err);
      }    
      res.json(article);
    });
  }

}