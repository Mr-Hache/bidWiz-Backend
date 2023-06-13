import { Injectable, ConflictException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
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
        if (!createUserDto.isWizard && (createUserDto.languages || createUserDto.subjects || createUserDto.experiences)) {
            throw new BadRequestException('You cannot pass wizard-related fields when isWizard is false');
        }
        const createdUser = new this.userModel(createUserDto);
        try {
            return await createdUser.save();
        } catch (error) {
            if (error.code === 11000) {
                let errorMessage = 'Conflict error: username, password, mail or phoneNumber already exists.'
                throw new ConflictException(errorMessage);
            }
                throw new InternalServerErrorException();
        }
    }
    
    async findAllWizards(): Promise<User[]> {
        return this.userModel.find(
            { isDisabled: false, role: { $ne: 'admin' }, isWizard: true },
            {password: 0, phoneNumber: 0, email: 0}).exec();
    }

    async findAllAdmin(): Promise<User[]> {
        return this.userModel.find({ isDisabled: false, role: { $ne: 'admin' }}).exec();
    }
    
    async findOne(username: string): Promise<User> {
        const user = await this.userModel.findOne({ username: username, isDisabled: false }).exec();
        return user;
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
