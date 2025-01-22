import { IsArray, IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateTierDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsArray()
  @IsNotEmpty()
  benefits: string[];

  @IsNumber()
  @IsNotEmpty()
  creatorId: number;
}
