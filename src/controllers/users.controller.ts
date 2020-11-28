import userModel, { IUser } from '../models/user.model';
import bcrypt from 'bcrypt';
import { ReponseMessages, getMessageFromParameter }  from '../utils/constants';

// Bcrypt variables
const saltRounds = 10;
const someOtherPlaintextPassword = 'not_bacon';


export class UsersController {

    constructor() {
        // TODO
    }
    public async getUsers(req: any, res: any): Promise<any> {
        try {
            const users = await userModel.find();
            const response = getMessageFromParameter(200, 'Users found', users);
            res.send(response);
        } catch (error) {
            const response = getMessageFromParameter(500, 'Server error', error.message);
            res.send(response)
        }
    }

    public async getUser(req: any, res: any): Promise<any> {
        const { _id } = req.query;

        try {
            const user = await userModel.findOne({ _id });
            const response = getMessageFromParameter(200, 'User found', user);
            res.send(response);
        } catch (error) {
            const response = getMessageFromParameter(500, 'Server error', error.message);
            res.send(response)
        }
    }
    public async createUser(req: any, res: any): Promise<any> {
        const user = req.body;

        try {
            const hash = await this.generateHashForPassword(user.password);
            user.password = hash;
            const result = await userModel.create(user);
            res.send(result);
        } catch (error) {
            const response: ReponseMessages = getMessageFromParameter(403, 'User not create', false);
            res.send(response);
            throw new Error(error);
        }

    }

    public async editUser(req: any, res: any): Promise<any> {
        const user = req.body;
        const { _id } = user;
        try {
            let response: ReponseMessages;
            const responseEdit = await userModel.findByIdAndUpdate(_id, user);
            const responseNewUser = await userModel.findById(responseEdit?._id)
            response = getMessageFromParameter(200, 'User edited', responseNewUser);
            res.send(response);
        } catch (error) {
            const response = getMessageFromParameter(500, 'Server error', error.message);
            res.send(response);
            throw new Error(error);
        }
    }

    public async deleteUser(req: any, res: any): Promise<any> {
        const { idUser } = req.body;
        try {
            const result = await userModel.findByIdAndDelete(idUser);
            const response: ReponseMessages = getMessageFromParameter(200, 'User deleted', result);
            res.send(response);
        } catch (error) {
            const response = getMessageFromParameter(500, 'Server error', error.message);
            res.send(response);
            throw new Error(error);
        }
    }

    public async login(req: any, res: any): Promise<any> {
        // Getting email and password
        const { email, password } = req.body;
        if(!email || !password) {
            const response: ReponseMessages = getMessageFromParameter(403, 'All Parameters required', false);
            res.send(response);
        }
        try {
            const result: IUser | null = await userModel.findOne({ email: email });
            const valid = await this.checkPasswordFromPlainText(password, result?.password || '');
            // const status = valid ? 200 : 403;
            //console.log(status)
            //const response: ResponseMessages = getMessageFromParameter()
            res.send({
                status: valid ? 200 : 403,
                message: valid ? 'Login ok' : 'Login failed',
                response: result
            });
        } catch (error) {
            const response: ReponseMessages = getMessageFromParameter(500,'Internal server error', true);
            res.send(response);
            throw new Error(error);
        }
    }

    /**   
     * Function create hash 
     * 
     * @param password  
     */
    private async generateHashForPassword(password: string): Promise<string> {
        return bcrypt.hash(password, saltRounds);
    }

    /**
     * Function to check if valid password
     * 
     * @param password plain password from client
     * @param hash hash matched with database
     */
    private async checkPasswordFromPlainText(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    public async searchUser(req: any, res: any) {
        const { query } = req.query;
        try {
            const products = await userModel.find({ name: { $regex: query, $options: 'i' } });
            const response = getMessageFromParameter(200, 'User found', products);
            res.send(response);
        } catch (error) {
            const response = getMessageFromParameter(500, 'Server error', error.message);
            res.send(response)
        }
    }

}