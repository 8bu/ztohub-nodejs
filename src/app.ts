import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as cors from "cors";
import { dbURL } from "./utils/config";
import { ArticlesRoutes } from "./routes/route.article";
import { UsersRoutes } from "./routes/route.user";
import { CategoriesRoutes } from "./routes/route.category";
import { whiteList } from "./utils/config";

class App {
  public app: express.Application;
  public articleRoutes: ArticlesRoutes = new ArticlesRoutes();
  public usersRoutes: UsersRoutes = new UsersRoutes();
  public categoriesRoutes: CategoriesRoutes = new CategoriesRoutes();
  public corsOptions:cors.CorsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: function (origin, callback) {
      if (whiteList.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    preflightContinue: false
  };
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
    this.app.use(cors(this.corsOptions))
  }
  private mongoSetup(): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(dbURL, { useNewUrlParser: true });
    console.log("Connected Mongodb");
  }
}

export default new App().app;
