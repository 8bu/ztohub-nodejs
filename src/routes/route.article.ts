import { Request, Response } from "express";
import { ArticleController } from "../controller/controller.article";
import { isAuth } from "../utils/middleware";

export class ArticlesRoutes {
  public articleController: ArticleController = new ArticleController();

  public routes(app): void {
    app.route("/article")
      .get((req: Request, res: Response) => {
        res.status(200).send({
          message: "Use /articles instead to get all articles"
        });
      })
      .post(isAuth, this.articleController.addNewArticle);
    app.route("/article/:query")
      .get(this.articleController.getArticle)
      .delete(isAuth, this.articleController.deleteArticle)
      .put(isAuth, this.articleController.updateArticle);
    app.route("/articles")
      .get(this.articleController.getAllArticle)
      // .delete(this.articleController.deleteAll)
  }
}
