// import { UserRole } from "src/utils";

import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
  // id: number;
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber()
  phone?: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string; 
}
