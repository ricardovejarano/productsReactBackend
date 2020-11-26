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
        this._routes.get('/getUsers', this.userController.getUsers.bind(this.userController));
        this._routes.get('/getUser', this.userController.getUser.bind(this.userController));
        this._routes.get('/searchUser', this.userController.searchUser.bind(this.userController));
        this._routes.post('/createUser', this.userController.createUser.bind(this.userController));
        this._routes.post('/editUser', this.userController.editUser.bind(this.userController));
        this._routes.post('/deleteUser', this.userController.deleteUser.bind(this.userController));
        this._routes.post('/login', this.userController.login.bind(this.userController));
    }

    get getRoute(): any {
        return this._routes;
    }

}