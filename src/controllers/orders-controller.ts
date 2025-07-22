import { knex } from "@/database/knex"
import { AppError } from "@/utils/AppError"
import { Request, Response, NextFunction } from "express"
import z from "zod"

class OrdersController {
	async create(request: Request, response: Response, next: NextFunction) {
		try {
			const bodySchema = z.object({
				table_session_id: z.number(),
				product_id: z.number(),
				quantity: z.number(),
			})

			const { table_session_id, product_id, quantity } = bodySchema.parse(
				request.body
			)

			const session = await knex<TableSessionsRepository>("tables_sessions")
				.where({ id: table_session_id })
				.first()

			if (!session) {
				throw new AppError("Sessão não está aberta!")
			}

			if (session.closed_at) {
				throw new AppError("Essa mesa está fechada!")
			}

			const product = await knex<ProductRepository>("products")
				.where({ id: product_id })
				.first()

			if (!product) {
				throw new AppError("Produto não encontrado!")
			}

			return response.status(201).json(product)
		} catch (error) {
			next(error)
		}
	}
}

export { OrdersController }
