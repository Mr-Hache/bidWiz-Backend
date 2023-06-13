import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserPasswordDto } from 'src/dto/update-user-password.dto';
import { UpdateUserWizardDto } from 'src/dto/update-user-wizard.dto';

@Injectable()
export class UsersService {
    constructor (@InjectModel(User.name) private userModel: Model<User>){}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }
    
    async findAll(): Promise<User[]> {
        return this.userModel.find({ isDisabled: false, role: { $ne: 'admin' }, isWizard: true }).exec();
    }
    
    async findOne(username: string): Promise<User> {
        return this.userModel.findOne({ username: username, isDisabled: false }).exec();
    }
    
    async updatePassword(username: string, updateUserPasswordDto: UpdateUserPasswordDto): Promise<User> {
        return this.userModel.findOneAndUpdate({ username: username, isDisabled: false }, { password: updateUserPasswordDto.newPassword }).exec();
    }
    
    async updateWizard(username: string, updateUserWizardDto: UpdateUserWizardDto): Promise<User> {
        return this.userModel.findOneAndUpdate({ username: username, isDisabled: false }, updateUserWizardDto).exec();
    }
    
    async disable(username: string): Promise<User> {
        return this.userModel.findOneAndUpdate({ username: username }, { isDisabled: true }).exec();
    }
}
