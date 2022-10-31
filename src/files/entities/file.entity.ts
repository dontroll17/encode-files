import { User } from '../../users/entities/user.entity';
import {  
    Column,
    CreateDateColumn,
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

    @CreateDateColumn()
    dateCreated: Date;

    @ManyToOne(() => User, user => user.files)
    user: User
}