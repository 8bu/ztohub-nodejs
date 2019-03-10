import { Request, Response } from "express";
import { UserController } from "../controller/controller.user";
import { isAuth } from "../utils/middleware";
export class UsersRoutes {
  public userController: UserController = new UserController();

  public routes(app): void {
    app.route("/user")
      .get((req: Request, res: Response) => {
        res.status(200).send({
          message: "Use /users instead to get all users"
        });
      })
      // .post(isAuth, this.userController.addNewUser);
    app.route("/user/:query")
      .get(isAuth, this.userController.getUser)
      // .delete(isAuth, this.userController.deleteUser)
      .put(isAuth, this.userController.updateUser);
    app.route("/users")
      .get(isAuth, this.userController.getAllUser)
      // .delete(this.userController.deleteAll)
    app.route("/signin")
      .post(this.userController.userLogin)
  }
}
