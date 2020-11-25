import productModel from '../models/product.model';
import categoryModel from '../models/category.model';
import { ReponseMessages, getMessageFromParameter } from '../utils/constants';

export class ProductController {

    constructor() {
        // TODO
    }

    public async getProducts(req: any, res: any): Promise<any> {
        try {
            const products = await productModel.find();
            const response = getMessageFromParameter(200, 'Products found', products);
            res.send(response);
        } catch (error) {
            const response = getMessageFromParameter(500, 'Server error', error.message);
            res.send(response)
        }
    }

    public async getProduct(req: any, res: any): Promise<any> {
        const { _id } = req.query;

        try {
            const product = await productModel.findOne({ _id });
            const response = getMessageFromParameter(200, 'Product found', product);
            res.send(response);
        } catch (error) {
            const response = getMessageFromParameter(500, 'Server error', error.message);
            res.send(response)
        }
    }

    public async createProduct(req: any, res: any): Promise<any> {
        const product = req.body;
        try {
            let response: ReponseMessages;
            const category = await categoryModel.findById(product.idCategory);
            if (category) {
                const result = await productModel.create(product);
                response = getMessageFromParameter(200, 'Product created', result);
                res.send(response);
            } else {
                response = getMessageFromParameter(400, 'Category not found', {});
                res.send(response)
            }

        } catch (error) {
            const response = getMessageFromParameter(500, 'Server error', error.message);
            res.send(response);
            throw new Error(error);
        }
    }

    public async deleteProduct(req: any, res: any): Promise<any> {
        const { idProduct } = req.body;
        try {
            const result = await productModel.findByIdAndDelete(idProduct);
            const response: ReponseMessages = getMessageFromParameter(200, 'Product deleted', result);
            res.send(response);
        } catch (error) {
            const response = getMessageFromParameter(500, 'Server error', error.message);
            res.send(response);
            throw new Error(error);
        }
    }

    public async editProduct(req: any, res: any): Promise<any> {
        const product = req.body;
        const { _id } = product;
        try {
            let response: ReponseMessages;
            const responseEdit = await productModel.findByIdAndUpdate(_id, product);
            const responseNewProduct = await productModel.findById(responseEdit?._id)
            response = getMessageFromParameter(200, 'Product edited', responseNewProduct);
            res.send(response);
        } catch (error) {
            const response = getMessageFromParameter(500, 'Server error', error.message);
            res.send(response);
            throw new Error(error);
        }
    }

}