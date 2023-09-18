import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { ResultsService } from './results.service';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { Request, Response } from 'express';

@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Post()
  create(@Body() createResultDto: CreateResultDto) {
    return this.resultsService.create(createResultDto);
  }

  @Get()
  findAll() {
    return this.resultsService.findAll();
  }

  @Get(':name')
  async findOne(@Param('name') name: string, @Res() res: Response) {
    const document = await this.resultsService.findOneByStudentName(name);
    return res.status(document.getStatus()).send(document.getResponse());
  }

  @Post('/validate')
  async validate(@Query() query, @Res() res: Response) {
    const validateObj = await this.resultsService.validate(
      query.name,
      query.dob,
    );
    return res.status(validateObj.getStatus()).send(validateObj.getResponse());
  }
}
