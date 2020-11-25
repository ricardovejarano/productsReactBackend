import { CategoryController } from '../controllers/category.controller';

export class CategoryRoutes {

    private _routes: any;
    private categoryController: CategoryController;

    constructor(routes: any) {
        this._routes = routes;
        this.categoryController = new CategoryController();
        this.defineRoute();
    }

    public defineRoute(): void {
        this._routes.post('/createCategory', this.categoryController.createCategory.bind(this.categoryController));
    }

    get getRoute(): any {
        return this._routes;
    }

}