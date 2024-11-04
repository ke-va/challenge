import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1729427595558 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "role" character varying NOT NULL DEFAULT 'user',
                CONSTRAINT "UQ_email" UNIQUE ("email"),
                CONSTRAINT "PK_users" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "sports" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "description" text NOT NULL,
                CONSTRAINT "PK_sports" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "classes" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "description" text NOT NULL,
                "duration" time NOT NULL,
                "weekSchedule" character varying NOT NULL,
                "startTime" time NOT NULL,
                "sportId" integer,
                CONSTRAINT "PK_classes" PRIMARY KEY ("id"),
                CONSTRAINT "FK_sport" FOREIGN KEY ("sportId") REFERENCES "sports"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "enrollments" (
                "id" SERIAL NOT NULL,
                "userId" integer,
                "classId" integer,
                CONSTRAINT "PK_enrollments" PRIMARY KEY ("id"),
                CONSTRAINT "FK_user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION,
                CONSTRAINT "FK_class" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE NO ACTION
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "enrollments"`);
        await queryRunner.query(`DROP TABLE "classes"`);
        await queryRunner.query(`DROP TABLE "sports"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
