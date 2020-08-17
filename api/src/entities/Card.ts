import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity} from "typeorm";
import {Bank} from "./Bank";
import {User} from "./User";

class Balance {
    @Column()
    credit: number;

    @Column()
    debit: number;

    @Column({nullable: true})
    creditLimit: number;
}

@Entity('cards')
class Card extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public description: string;

    @ManyToOne(type => Bank)
    public bank: Bank;

    @Column()
    public cvv: string;

    @Column()
    public expiresDate: Date;

    @Column(type => Balance)
    public balance: Balance;

    @ManyToOne(type => User)
    public user: User;

    static from(params: object) {
        const card = new Card();
        Object.assign(card, params);
        return card;
    }

}

export {Card};
