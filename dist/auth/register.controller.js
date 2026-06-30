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
exports.RegisterController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
let RegisterController = class RegisterController {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async register(body) {
        const { nombre, email, password, numeroIdentificacion, direccionResidencia, paisResidencia } = body;
        if (!nombre?.trim() || !email?.trim() || !password || password.length < 4) {
            throw new common_1.HttpException('Nombre, email y contraseña (min 4 caracteres) son obligatorios', common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            const nuevoUsuario = this.userRepository.create({
                nombre: nombre.trim(),
                email: email.trim().toLowerCase(),
                password: password,
                numeroIdentificacion: numeroIdentificacion?.trim(),
                direccionResidencia: direccionResidencia?.trim(),
                paisResidencia: paisResidencia?.trim()
            });
            await this.userRepository.save(nuevoUsuario);
            return {
                success: true,
                message: 'Usuario raíz creado exitosamente'
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('El correo electrónico ya está registrado', common_1.HttpStatus.CONFLICT);
        }
    }
};
exports.RegisterController = RegisterController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RegisterController.prototype, "register", null);
exports.RegisterController = RegisterController = __decorate([
    (0, common_1.Controller)('auth'),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RegisterController);
//# sourceMappingURL=register.controller.js.map