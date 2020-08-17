import {MigrationInterface, QueryRunner} from "typeorm";
import {Bank} from "../entities/Bank";

export class Cards1597450980251 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        console.log('[Migration Cards] Running')
        const nubank = new Bank();
        nubank.description = 'Nubank';
        nubank.brand = 'https://logodownload.org/wp-content/uploads/2019/08/nubank-logo-7.png';
        nubank.flag = 'https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_circles_92px_2x.png';
        nubank.color = '#AB5CEA';
        await nubank.save();
        console.log('[Migration Cards] Runned')
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
