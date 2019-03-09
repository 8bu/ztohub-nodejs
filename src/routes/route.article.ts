import { Request, Response } from "express";
import { ArticleController } from "../controller/controller.article";

export class ArticlesRoutes {
  public articleController: ArticleController = new ArticleController();

  public routes(app): void {
    app.route("/article")
      .get((req: Request, res: Response) => {
        res.status(200).send({
          message: "Use /articles instead to get all articles"
        });
      })
      .post(this.articleController.addNewArticle);
    app.route("/article/:query")
      .get(this.articleController.getArticle)
      .delete(this.articleController.deleteArticle)
      .put(this.articleController.updateArticle);
    app.route("/articles")
      .get(this.articleController.getAllArticle)
      // .delete(this.articleController.deleteAll)
  }
}
