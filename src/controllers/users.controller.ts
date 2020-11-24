import userModel from '../models/user.model';

export class UsersController {

    constructor() {
        // TODO
    }

    public async createUser(req: any, res: any): Promise<any> {
        const user = req.body;
        try {
            const result = await userModel.create(user);
            res.send(result);
        } catch (error) {
            res.send({
                'error': error.message
            });
            throw new Error(error);
        }
    }

    public editUser(req: any, res: any): any {
        console.log(req, res)
    }


}