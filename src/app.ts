import * as express from "express";
import * as bodyParser from "body-parser";
import { ArticlesRoutes } from "./routes/route.article";

class App {

    public app: express.Application;
    public articleRoutes: ArticlesRoutes = new ArticlesRoutes();

    constructor() {
        this.app = express();
        this.config();
        this.articleRoutes.routes(this.app);  
    }

    private config(): void{
        // Giúp chúng ta tiếp nhận dữ liệu từ body của request
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

}

export default new App().app;