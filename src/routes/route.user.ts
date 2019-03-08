import { Request, Response } from "express";
import { UserController } from "../controller/controller.user";

export class UsersRoutes {
  public userController: UserController = new UserController();

  public routes(app): void {
    app
      .route("/user")
      .get((req: Request, res: Response) => {
        res.status(200).send({
          message: "Use /users instead to get all users"
        });
      })
      .post(this.userController.addNewUser);
    app.route("/user/:query")
      .get(this.userController.getUser)
      .delete(this.userController.deleteUser)
      .put(this.userController.updateUser);
    app.route("/users")
      .get(this.userController.getAllUser)
      // .delete(this.userController.deleteAll)
  }
}
