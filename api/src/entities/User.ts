import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from "typeorm";

@Entity('users')
class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({select: false})
    password: string;

    @Column()
    email: string;

    @Column()
    image: string;

    @Column({select: false})
    cpf: string;

    @Column("date", {name: "data_nascimento"})
    dataNascimento: string;

    static from(params: object) {
        const user = new User();
        Object.assign(user, params);
        return user;
    }

}

export {User};
