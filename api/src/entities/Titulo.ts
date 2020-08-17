import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import {User} from "./User";
import {Category} from "./Category";

export enum TypeTituloEnum {
    RECEITA = 'RECEITA',
    DESPESA = 'DESPESA'
}

export interface ResumeResultQuery {
    type: TypeTituloEnum;
    total: number;
}

@Entity('titulos')
class Titulo extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public description: string;

    @Column()
    public value: number;

    @Column('simple-enum')
    public type: TypeTituloEnum

    @Column()
    public dateCreated: Date;

    @Column({default: false})
    public repeat: boolean = false;

    @ManyToOne(type => Category)
    public category: Category;

    @ManyToOne(type => User)
    public user: User;

    static from(params: object) {
        const titulo = new Titulo();
        Object.assign(titulo, params);
        return titulo;
    }

    async saveDespesa() {
        this.type = TypeTituloEnum.DESPESA;
        return await this.save();
    }

    async saveReceita() {
        this.type = TypeTituloEnum.RECEITA;
        return await this.save();
    }

}

export {Titulo};
