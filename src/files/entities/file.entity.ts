import { User } from '../../users/entities/user.entity';
import {  
    Column,
    Entity, 
    ManyToOne, 
    PrimaryGeneratedColumn, 
} from 'typeorm';

@Entity()
export class File {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    files: string;

    @ManyToOne(() => User, user => user.files)
    user: User
}