import ArticleModel from '../models/model.article';
import { Request, Response } from 'express';

export class ArticleController {

  public addNewArticle (req: Request, res: Response) {                
    let newArticle = new ArticleModel(req.body);
    newArticle.save((err, article) => {
      if(err){
          res.send(err);
      }    
      res.json(article);
    });
  }

}