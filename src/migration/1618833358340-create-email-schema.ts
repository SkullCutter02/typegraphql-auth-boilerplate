import {MigrationInterface, QueryRunner} from "typeorm";

export class createEmailSchema1618833358340 implements MigrationInterface {
    name = 'createEmailSchema1618833358340'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "emails" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" character varying NOT NULL, "token" character varying NOT NULL, "expirationDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_a54dcebef8d05dca7e839749571" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "emails"`);
    }

}
