import type { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable("orders", (table) => {
		// id da ordem
		table.increments("id").primary(),
			// id da mesa que fez a ordem
			table
				.integer("table_session_id")
				.notNullable()
				.references("id")
				.inTable("tables_sessions"),
			// id do produto pedido
			table
				.integer("product_id")
				.notNullable()
				.references("id")
				.inTable("products"),
			// quantidade
			table.integer("quantity").notNullable(),
			// preço do produto.
			table.decimal("price").notNullable(),
			// criado em
			table.timestamp("created_at").defaultTo(knex.fn.now()),
			table.timestamp("updated_at").defaultTo(knex.fn.now())
	})
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable("orders")
}
