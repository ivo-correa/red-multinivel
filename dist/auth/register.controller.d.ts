import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
export declare class RegisterController {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    register(body: any): Promise<{
        success: boolean;
        message: string;
    }>;
}
