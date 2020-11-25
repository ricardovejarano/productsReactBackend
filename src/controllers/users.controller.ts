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

    public async createUser(req: any, res: any): Promise<any> {
        const user = req.body;

        try {
            const hash = await this.generateHashForPassword(user.password);
            user.password = hash;
            const result = await userModel.create(user);
            res.send(result);
        } catch (error) {
            const response: ReponseMessages = getMessageFromParameter(500, 'User not create', error.message);
            res.send(response);
            throw new Error(error);
        }

    }

    public editUser(req: any, res: any): any {
        console.log(req, res)
    }

    public deleteUser(req: any, res: any): any {
        console.log(req, res)
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

}