import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getMyNetwork(id: number): Promise<any>;
    createReferral(userData: any, sponsorId?: string): Promise<any>;
    createRoot(userData: any): Promise<any>;
    getAllRoots(): Promise<any>;
    getOne(id: string): Promise<any>;
    update(id: string, updateData: any): Promise<any>;
    getChildren(id: string): Promise<any>;
}
