import { Request, Response } from "express";
import { CategoryController } from "../controller/controller.category";
import { isAuth } from "../utils/middleware";

export class CategoriesRoutes {
  public categoryController: CategoryController = new CategoryController();

  public routes(app): void {
    app.route("/category")
      .get((req: Request, res: Response) => {
        res.status(200).send({
          message: "Use /categories instead to get all categories"
        });
      })
      .post(isAuth, this.categoryController.addNewCategory);
    app.route("/category/:query")
      .get(this.categoryController.getCategory)
      .delete(isAuth, this.categoryController.deleteCategory)
      .put(isAuth, this.categoryController.updateCategory);
    app.route("/categories")
      .get(this.categoryController.getAllCategory)
      // .delete(this.categoryController.deleteAll)
  }
}
