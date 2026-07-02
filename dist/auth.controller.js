"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let AuthController = class AuthController {
    dataSource;
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async login(body) {
        const { email, password } = body;
        console.log(`Intento de login - Email: ${email}, Password: ${password}`);
        if (!email || !email.includes('@') || !password) {
            throw new common_1.HttpException('Campos incompletos', common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            const users = await this.dataSource.query('SELECT id, password FROM user WHERE email = ? LIMIT 1', [email.trim()]);
            console.log('Usuarios encontrados en BD:', users);
            if (users.length > 0 && users[0].password.toString().trim() === password.toString().trim()) {
                return { success: true, userId: users[0].id };
            }
            console.log('Falló la comparación. BD tiene:', users[0]?.password, 'Input tiene:', password);
            throw new common_1.HttpException('Credenciales incorrectas', common_1.HttpStatus.UNAUTHORIZED);
        }
        catch (e) {
            throw e;
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], AuthController);
//# sourceMappingURL=auth.controller.js.map