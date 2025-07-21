import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("tables", (tables) => {
    tables.increments("id").primary(),
    tables.integer("table_number").notNullable(),
    tables.timestamp("created_at").defaultTo(knex.fn.now()),
    tables.timestamp("updated_at").defaultTo(knex.fn.now())
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("tables")
}

