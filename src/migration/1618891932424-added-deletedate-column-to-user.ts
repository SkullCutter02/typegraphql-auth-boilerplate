import {MigrationInterface, QueryRunner} from "typeorm";

export class addedDeletedateColumnToUser1618891932424 implements MigrationInterface {
    name = 'addedDeletedateColumnToUser1618891932424'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`);
    }

}
