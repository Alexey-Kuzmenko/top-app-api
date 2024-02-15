import { Type } from 'class-transformer';
import { IsNumber, IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';

class ProductCharacteristicDto {
    @IsString()
    name: string

    @IsString()
    value: string
}


export default class CreateProductDto {
    @IsString()
    image: string;

    @IsString()
    title: string;

    @IsNumber()
    price: number;

    @IsOptional()
    @IsNumber()
    oldPrice?: number;

    @IsNumber()
    credit: number;

    @IsString()
    description: string;

    @IsString()
    disAdvantages: string;

    @IsArray()
    @IsString({ each: true })
    categories: Array<string>;

    @IsArray()
    @IsString({ each: true })
    tags: Array<string>;

    @IsArray()
    @ValidateNested()
    @Type(() => ProductCharacteristicDto)
    characteristics: Array<ProductCharacteristicDto>
}