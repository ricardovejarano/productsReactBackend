import categoryModel from '../models/category.model';
import userModel from '../models/user.model';
import { ReponseMessages, getMessageFromParameter } from '../utils/constants';

export class CategoryController {

    constructor() {
        // TODO
    }

    public async getCategories(req: any, res: any): Promise<any> {
        try {
            const categories = await categoryModel.find();
            const response = getMessageFromParameter(200, 'Categories found', categories);
            res.send(response);
        } catch (error) {
            const response = getMessageFromParameter(500, 'Server error', error.message);
            res.send(response)
        }
    }

    public async getCategory(req: any, res: any): Promise<any> {
        const { _id } = req.query;

        try {
            const category = await categoryModel.findOne({ _id });
            const response = getMessageFromParameter(200, 'Category found', category);
            res.send(response);
        } catch (error) {
            const response = getMessageFromParameter(500, 'Server error', error.message);
            res.send(response)
        }
    }

    public async createCategory(req: any, res: any): Promise<any> {
        const category = req.body;
        try {
            const user = await userModel.findById(category.idUser);
            let response: ReponseMessages;
            if (user) {
                const result = await categoryModel.create(category);
                response = getMessageFromParameter(200, 'Category created', result);
                res.send(result);
            } else {
                response = getMessageFromParameter(400, 'User not found', {});
                res.send(response);
            }

        } catch (error) {
            const response = getMessageFromParameter(500, 'internal server error', error.message);
            res.send(response);
            throw new Error(error);
        }
    }

    public async editCategory(req: any, res: any):  Promise<any> {
        const category = req.body;
        const { _id } = category;
        try {
            let response: ReponseMessages;
            const responseEdit = await categoryModel.findByIdAndUpdate(_id, category);
            const responseNewCategory = await categoryModel.findById(responseEdit?._id)
            response = getMessageFromParameter(200, 'Category edited', responseNewCategory);
            res.send(response);
        } catch (error) {
            const response = getMessageFromParameter(500, 'Server error', error.message);
            res.send(response);
            throw new Error(error);
        }
    }

    public  async deleteCategory(req: any, res: any):  Promise<any>{
        const { idCategory } = req.body;
        try {
            const result = await categoryModel.findByIdAndDelete(idCategory);
            const response: ReponseMessages = getMessageFromParameter(200, 'Category deleted', result);
            res.send(response);
        } catch (error) {
            const response = getMessageFromParameter(500, 'Server error', error.message);
            res.send(response);
            throw new Error(error);
        }
    }

    public async searchCategory(req: any, res: any) {
        const { query } = req.query;
        try {
            const category = await categoryModel.find({ name: { $regex: query, $options: 'i' } });
            const response = getMessageFromParameter(200, 'Category found', category);
            res.send(response);
        } catch (error) {
            const response = getMessageFromParameter(500, 'Server error', error.message);
            res.send(response)
        }
    }

}