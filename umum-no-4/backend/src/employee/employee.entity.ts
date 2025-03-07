import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('employee')
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    address: string;

    @Column()
    position: string;
}