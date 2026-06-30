import { TreeRepository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private readonly userRepo;
    constructor(userRepo: TreeRepository<User>);
    addReferral(userData: any, sponsorId: number | null): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    updateUser(id: number, updateData: any): Promise<User>;
    findAllRoots(): Promise<User[]>;
    getChildren(id: number): Promise<User>;
    getFullNetwork(id: number): Promise<User | null>;
}
