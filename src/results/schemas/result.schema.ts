import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import { CreateResultDto } from "../dto/create-result.dto";
import { Document } from "mongoose";
export type UserDocument=Results&Document
@Schema({
    timestamps:true
})
export class Results{
    @Prop()
    studentName:string
    @Prop()
    dob:string
    @Prop()
    subjectName:string
    @Prop()
    subjectCode:string
    @Prop()
    internalMarks:Number
    @Prop()
    attendance:Number
    @Prop()
    assignment:Number
}

export const ResultSchema=SchemaFactory.createForClass(Results)