import categoryModel from '../models/category.model';
import userModel from '../models/user.model';
import { ReponseMessages, getMessageFromParameter } from '../utils/constants';

export class CategoryController {

    constructor() {
        // TODO
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

    public editCategory(req: any, res: any): any {
        console.log(req, res)
    }

    public deleteCategory(req: any, res: any): any {
        console.log(req, res)
    }

}