import { ProductController } from '../controllers/product.controller';

export class ProductRoutes {

    private _routes: any;
    private productController: ProductController;

    constructor(routes: any) {
        this._routes = routes;
        this.productController = new ProductController();
        this.defineRoute();
    }

    public defineRoute(): void {
        this._routes.get('/getProducts', this.productController.getProducts.bind(this.productController));
        this._routes.get('/getProduct', this.productController.getProduct.bind(this.productController));
        this._routes.get('/searchProducts', this.productController.searchProducts.bind(this.productController));
        this._routes.get('/getProductsByUser', this.productController.getProductsByUser.bind(this.productController));
        this._routes.post('/createProduct', this.productController.createProduct.bind(this.productController));
        this._routes.post('/deleteProduct', this.productController.deleteProduct.bind(this.productController));
        this._routes.post('/editProduct', this.productController.editProduct.bind(this.productController));
    }

    get getRoute(): any {
        return this._routes;
    }

}