import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Results, UserDocument } from './schemas/result.schema';
import { Model } from 'mongoose';
@Injectable()
export class ResultsService {
  constructor(
    @InjectModel('Result') private readonly resultModel: Model<UserDocument>,
  ) {}
  async create(createResultDto: CreateResultDto) {
    const result = new this.resultModel(createResultDto);
    return await result.save();
  }

  async findAll() {
    return await this.resultModel.find();
  }

  async findOneByStudentName(name: string) {
    const doc = await this.resultModel.find({ studentName: name });
    console.log(doc);
    if (doc) {
      return new HttpException(doc, HttpStatus.OK);
    } else {
      return new HttpException('no record found', HttpStatus.NOT_FOUND);
    }
  }

  async validate(name: string, dob: string) {
    const doc = await this.resultModel.findOne({ studentName: name });
    if (doc) {
      console.log(doc);
      if (doc.dob === dob) {
        return new HttpException(doc, HttpStatus.OK);
      } else {
        return new HttpException(
          'mismatched rollno or dob',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } else {
      return new HttpException(
        'mismatched rollno or dob',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
