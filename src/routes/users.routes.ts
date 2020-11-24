import { UsersController } from '../controllers/users.controller';

export class UserRoutes {

    private _routes: any;
    private userController: UsersController;

    constructor(routes: any) {
        this._routes = routes;
        this.userController = new UsersController();
        this.defineRoute();
    }

    public defineRoute(): void {
        this._routes.post('/login', this.userController.createUser.bind(this.userController));
    }

    get getRoute(): any {
        return this._routes;
    }

}