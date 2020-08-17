import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import {User} from "./User";

@Entity('categories')
class Category extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public description: string;

    @Column()
    public icon: string;

    @Column({default: '#000000'})
    public iconColor?: string = '#000000';

    @Column({default: '#FFFFFF'})
    public iconBg?: string = '#FFFFFF';

    @ManyToOne(type => User)
    public user: User;

    static from(params: object) {
        const category = new Category();
        Object.assign(category, params);
        return category;
    }

}

export {Category};
