import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    private readonly jwtService: JwtService
  ) {}
  
  async create(createUserDto: CreateUserDto) {
    try {
      const salt = await bcrypt.genSalt();
      createUserDto.password = await bcrypt.hash(createUserDto.password, salt);

      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }: LoginDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { email: user.email, sub: user.id };
      const token = this.jwtService.sign(payload);

      return { access_token: token };
    } catch (error) {
      throw error;
    }
  }

  async findAll(role?: 'USER' | 'ADMIN' | 'COMRADE') {
    try {
      if(role){
        // if(role.)
        return await this.userRepository.find({
          where: {
            role
          }
        })
      }
      return await this.userRepository.find();
    } catch (error) {
      throw error
    }
  }

  async findOne(id: number) {
    try {
      let user = await this.userRepository.findOne({
        where: { id }
      })
  
      if(!user){
        throw new NotFoundException()
      }
  
      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      let user = await this.findOne(id)
      if(!user) {
        throw new NotFoundException()
      }
  
      return await this.userRepository.update(id, updateUserDto)
    } catch (error) {
      throw error
    }
  }

  async remove(id: number) {
    try {
      let user = await this.findOne(id)
      if(!user){
        throw new NotFoundException()
      }
  
      return await this.userRepository.remove(user)
    } catch (error) {
      throw error;
    }
  }
}
