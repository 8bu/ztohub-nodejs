import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import { dbURL } from "./utils/config";
import { ArticlesRoutes } from "./routes/route.article";
import { UsersRoutes } from "./routes/route.user";
import { CategoriesRoutes } from "./routes/route.category";
class App {
  public app: express.Application;
  public articleRoutes: ArticlesRoutes = new ArticlesRoutes();
  public usersRoutes: UsersRoutes = new UsersRoutes();
  public categoriesRoutes: CategoriesRoutes = new CategoriesRoutes();
  
  constructor() {
    this.app = express();
    this.config();
    this.mongoSetup();
    this.app.route("/").get((req, res) => {
      res.status(200).send({
        message: "What are you doing here, sir?"
      });
    });
    this.articleRoutes.routes(this.app);
    this.usersRoutes.routes(this.app);
    this.categoriesRoutes.routes(this.app);
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
  private mongoSetup(): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(dbURL, { useNewUrlParser: true });
    console.log("Connected Mongodb");
  }
}

export default new App().app;
