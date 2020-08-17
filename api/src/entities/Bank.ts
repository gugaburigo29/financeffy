import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('banks')
class Bank extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public description: string;

    @Column()
    public brand: string;

    @Column()
    public flag: string;

    @Column()
    public color: string;

    async create(description: string, brandSrc: string, flagSrc: string) {
        const bank = new Bank();
        bank.description = description;
        bank.brand = brandSrc;
        bank.flag = flagSrc;
        return bank;
    }
}

export {Bank};
