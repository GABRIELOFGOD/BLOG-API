import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  // @IsNumber()
  // @IsNotEmpty()
  // posterId: number;

  // @IsString()
  // @IsNotEmpty()
  // author: string;

  imageUrl?: string;
}
