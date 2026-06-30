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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    userRepo;
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async addReferral(userData, sponsorId) {
        let parent = null;
        if (sponsorId) {
            parent = await this.userRepo.findOne({ where: { id: sponsorId } });
            if (!parent)
                throw new common_1.NotFoundException(`Sponsor con ID ${sponsorId} no encontrado`);
        }
        const newUser = this.userRepo.create({
            ...userData,
            parent: parent || undefined
        });
        return await this.userRepo.save(newUser);
    }
    async getUserById(id) {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException(`Usuario con ID ${id} no encontrado`);
        return user;
    }
    async updateUser(id, updateData) {
        const user = await this.getUserById(id);
        Object.assign(user, updateData);
        return await this.userRepo.save(user);
    }
    async findAllRoots() {
        const roots = await this.userRepo.findRoots();
        return await Promise.all(roots.map((root) => this.userRepo.findDescendantsTree(root)));
    }
    async getChildren(id) {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException(`Usuario con ID ${id} no encontrado`);
        return await this.userRepo.findDescendantsTree(user);
    }
    async getFullNetwork(id) {
        const root = await this.userRepo.findOne({ where: { id } });
        return root ? await this.userRepo.findDescendantsTree(root) : null;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.TreeRepository])
], UsersService);
//# sourceMappingURL=users.service.js.map