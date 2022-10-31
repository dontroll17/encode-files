import { File } from '../../files/entities/file.entity';
import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn, 
    VersionColumn 
} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @VersionColumn()
    version: number;

    @OneToMany(() => File, file => file.user)
    files: File[]

    toResponse() {
        const { id, email, version, files } = this;
        return {
            id,
            email,
            version,
            files
        }
    }
}