import {IsString, IsNumber, IsNotEmpty, Min,Length, IsOptional} from 'class-validator';

export class UpdateProductDto {
    @IsString()
    @IsNotEmpty()
    @Length(2,150)
    @IsOptional()
    title?:string;

    @IsNumber()
    @IsNotEmpty()
    @Min(0,{message :'product price must be greater than 0'})
    @IsOptional()
    price?:number;
}