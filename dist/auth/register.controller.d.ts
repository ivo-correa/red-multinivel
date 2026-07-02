import { UsersService } from '../users/users.service';
export declare class RegisterController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(body: any): Promise<{
        success: boolean;
        message: string;
    }>;
}
