import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/authentication/dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    async create(createUserDto: CreateUserDto): Promise<UserDto | null> {
        const createUser = await this.userModel.create(createUserDto);
        return {name:createUser.name, email:createUser.email};
    }

    async findOne(email: string): Promise<User | null> {
        const user = await this.userModel.findOne({ email: email }).exec();
        return user;
    }

    //#region 
    async encryptPassword(password: string): Promise<String> {
        const saltRounds = 15;
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    }

    async decryptPassword(password: string, hash: string): Promise<Boolean> {
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    }
    //#endregion
}