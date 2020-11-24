import categoryModel from '../models/category.model';

export class CategoryController {

    constructor() {
        // TODO
    }

    public async createCategory(req: any, res: any): Promise<any> {
        const category = req.body;
        try {
            const result = await categoryModel.create(category);
            res.send(result);
        } catch (error) {
            res.send({
                'error': error.message
            });
            throw new Error(error);
        }
    }

    public editCategory(req: any, res: any): any {
        console.log(req, res)
    }

    public deleteCategory(req: any, res: any):any {
        console.log(req, res)
    }

}