import { DataSource } from 'typeorm';
export declare class AuthController {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    login(body: any): Promise<{
        success: boolean;
        userId: any;
    }>;
}
