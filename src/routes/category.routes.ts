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

        this._routes.get('/getCategories', this.categoryController.getCategories.bind(this.categoryController));
        this._routes.get('/getCategory', this.categoryController.getCategory.bind(this.categoryController));
        this._routes.get('/searchCategory', this.categoryController.searchCategory.bind(this.categoryController));
        this._routes.post('/createCategory', this.categoryController.createCategory.bind(this.categoryController));
        this._routes.post('/deleteCategory', this.categoryController.deleteCategory.bind(this.categoryController));
        this._routes.post('/editCategory', this.categoryController.editCategory.bind(this.categoryController));
        
    }

    get getRoute(): any {
        return this._routes;
    }

}