import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getMyNetwork(id: number): Promise<any>;
    createReferral(userData: any, sponsorId?: string): Promise<import("./entities/user.entity").User[]>;
    createRoot(userData: any): Promise<import("./entities/user.entity").User[]>;
    getAllRoots(): Promise<import("./entities/user.entity").User[]>;
    getOne(id: string): Promise<import("./entities/user.entity").User>;
    update(id: string, updateData: any): Promise<import("./entities/user.entity").User>;
    getChildren(id: string): Promise<any>;
}
