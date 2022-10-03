import { 
    Column, 
    CreateDateColumn, 
    Entity, 
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

    toResponse() {
        const { id, email } = this;
        return {
            id,
            email
        }
    }
}