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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerEntity = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let WorkerEntity = class WorkerEntity extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], WorkerEntity.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], WorkerEntity.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], WorkerEntity.prototype, "password", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], WorkerEntity.prototype, "dateOfBirth", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], WorkerEntity.prototype, "sity", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], WorkerEntity.prototype, "school", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], WorkerEntity.prototype, "inn", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], WorkerEntity.prototype, "work", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], WorkerEntity.prototype, "cv", void 0);
WorkerEntity = __decorate([
    sequelize_typescript_1.Table
], WorkerEntity);
exports.WorkerEntity = WorkerEntity;
//# sourceMappingURL=worker.entity.js.map