import {Request, Response} from "express";
import { ArticleController } from "../controller/controller.article";

export class ArticlesRoutes {

  public articleController: ArticleController = new ArticleController();
    
  public routes(app): void {   
    app.route('/article')
      .get((req: Request, res: Response) => {            
        res.status(200).send({
            message: 'Use /articles instead to get all articles'
        })
      })
      .post(this.articleController.addNewArticle)
  }
}