import productModel from '../models/product.model';

export class ProductController {

    constructor() {
        // TODO
    }

    public async createProduct(req: any, res: any): Promise<any> {
        const product = req.body;
        try {
            const result = await productModel.create(product);
            res.send(result);
        } catch (error) {
            res.send({
                'error': error.message
            });
            throw new Error(error);
        }
    }

    public editProduct(req: any, res: any): any {
        console.log(req, res)
    }

    public deleteProduct(req: any, res: any):any {
        console.log(req, res)
    }

}