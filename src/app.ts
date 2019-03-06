import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import { dbURL } from "./utils/config";
import { ArticlesRoutes } from "./routes/route.article";

class App {
  public app: express.Application;
  public articleRoutes: ArticlesRoutes = new ArticlesRoutes();
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
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
  private mongoSetup(): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(dbURL, { useNewUrlParser: true });
  }
}

export default new App().app;
