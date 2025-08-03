import {
  MinLength,
  IsNumber,
  IsNotEmpty,
  IsString,
  IsBoolean,
} from "class-validator";
import { Item } from "../types/item";

export class CreatePeditoDto {
  @IsNotEmpty()
  @IsNumber()
  numero!: number;
  @IsString()
  @IsNotEmpty()
  @MinLength(14)
  cnpj!: string;
  items!: Item[];
  @IsBoolean()
  status!: boolean;
}
