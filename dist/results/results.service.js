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
exports.ResultsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ResultsService = class ResultsService {
    constructor(resultModel) {
        this.resultModel = resultModel;
    }
    async create(createResultDto) {
        const result = new this.resultModel(createResultDto);
        return await result.save();
    }
    async findAll() {
        return await this.resultModel.find();
    }
    async findOneByStudentName(name) {
        const doc = await this.resultModel.find({ studentName: name });
        console.log(doc);
        if (doc) {
            return new common_1.HttpException(doc, common_1.HttpStatus.OK);
        }
        else {
            return new common_1.HttpException('no record found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async validate(name, dob) {
        const doc = await this.resultModel.findOne({ studentName: name });
        if (doc) {
            console.log(doc);
            if (doc.dob === dob) {
                return new common_1.HttpException(doc, common_1.HttpStatus.OK);
            }
            else {
                return new common_1.HttpException('mismatched rollno or dob', common_1.HttpStatus.UNAUTHORIZED);
            }
        }
        else {
            return new common_1.HttpException('mismatched rollno or dob', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
ResultsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Result')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ResultsService);
exports.ResultsService = ResultsService;
//# sourceMappingURL=results.service.js.map