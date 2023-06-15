import { Injectable, ConflictException, InternalServerErrorException, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
        if (!createUserDto.isWizard && (createUserDto.languages || createUserDto.subjects || createUserDto.experience)) {
            throw new BadRequestException('You cannot pass wizard-related fields when isWizard is false');
        }

        if (createUserDto.isWizard && (!createUserDto.experience || !createUserDto.experience.title || !createUserDto.experience.origin)) {
            throw new BadRequestException('You must provide experience title and origin when isWizard is true');
        }
        const createdUser = new this.userModel(createUserDto);
        
        try {
            return await createdUser.save();
        } catch (error) {
            if (error.code === 11000) {
                let errorMessage = 'Conflict error: username, mail or phoneNumber already exists.'
                throw new ConflictException(errorMessage);
            }
            if (error.name === 'ValidationError') {
                let errorMessage = 'Validation error: ' + error.message;
                throw new BadRequestException(errorMessage);
            }
                throw new InternalServerErrorException();
        }
    }
    
    async findAllWizards(subjects?: string[], languages?: string[], page = 1, size = 10): Promise<User[]> {
        let query = {
          isDisabled: false,
          role: { $ne: 'admin' },
          isWizard: true
        };
      
        let andConditions = [];
      
        if (subjects) {
          andConditions.push({ 'subjects': { $in: subjects } });
        }
      
        if (languages) {
          andConditions.push({ 'languages': { $in: languages } });
        }
      
        if(andConditions.length > 0) {
          query['$and'] = andConditions;
        }
     
        return this.userModel.find(query, { password: 0, phoneNumber: 0, email: 0 })
          .skip((page - 1) * size)
          .limit(size)
          .exec();
      }
      
      
      

    async findAllAdmin(): Promise<User[]> {
        return this.userModel.find({role: { $ne: 'admin' }}).exec();
    }
    
    async findOne(username: string): Promise<User> {
        const user = await this.userModel.findOne({ username: username, isDisabled: false }).exec();
        if (!user) {
            throw new NotFoundException(`User with username ${username} not found`);
        }
        return user;
    }
    
    async updatePassword(username: string, updateUserPasswordDto: UpdateUserPasswordDto): Promise<User> {
        const user = await this.userModel.findOne({ username: username, isDisabled: false }).exec();
        if (!user) {
            throw new NotFoundException(`User with username ${username} not found`);
        }
        if(user.password !== updateUserPasswordDto.pastPassword) {
            throw new UnauthorizedException(`Past password is not correct`);
        }

        if(updateUserPasswordDto.newPassword === updateUserPasswordDto.pastPassword) {
            throw new BadRequestException(`New password cannot be the same as the old password`);
        }
        const updatedUser = await this.userModel.findOneAndUpdate({ username: username, isDisabled: false }, { password: updateUserPasswordDto.newPassword }, {new: true});
        return updatedUser;
    }
    
    async updateWizard(username: string, updateUserWizardDto: UpdateUserWizardDto): Promise<User> {
        const user = await this.userModel.findOne({ username: username, isDisabled: false }).exec();
        if (!user) {
            throw new NotFoundException(`User with username ${username} not found`);
        }

        if (!user.isWizard && updateUserWizardDto.isWizard === true) {
            if (!updateUserWizardDto.languages || !updateUserWizardDto.subjects || !updateUserWizardDto.experience || !updateUserWizardDto.image) {
                throw new BadRequestException('You must provide languages, subjects, experiences, and image when changing isWizard to true');
            }
        }

        if (!user.isWizard && updateUserWizardDto.isWizard === true) {
            if (!updateUserWizardDto.languages || !updateUserWizardDto.subjects || !updateUserWizardDto.experience || !updateUserWizardDto.image) {
                throw new BadRequestException('You must provide languages, subjects, experiences, and image when changing isWizard to true');
            }
            if (!updateUserWizardDto.experience.title || !updateUserWizardDto.experience.origin) {
                throw new BadRequestException('You must provide experience title and origin when changing isWizard to true');
            }
        }
        const updatedUser = await this.userModel.findOneAndUpdate({ username: username, isDisabled: false }, updateUserWizardDto, {new: true})
        return updatedUser;
    }
    
    async disable(username: string): Promise<User> {
        const user = await this.userModel.findOneAndUpdate({ username: username }, { isDisabled: true }).exec();
        if (!user) {
            throw new NotFoundException(`User with username ${username} not found`);
        }
        return user;
    }
    
}
