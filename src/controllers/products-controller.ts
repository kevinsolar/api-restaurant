import { NextFunction, Request, Response } from "express"
import { knex } from "../database/knex"
import z from "zod"
import { AppError } from "@/utils/AppError"

class ProductController {
	// GET
	async index(request: Request, response: Response, next: NextFunction) {
		try {
			const { name } = request.query

			const products = await knex<ProductRepository>("products")
				.select()
				.whereLike("name", `%${name ?? ""}%`)
				.orderBy("name")

			return response.json(products)
		} catch (error) {
			// vamos utilizar o next para passar, de forma assincrona, o nosso erro para o express.
			next(error)
		}
	}

	// POST
	async create(request: Request, response: Response, next: NextFunction) {
		try {
			const bodySchema = z.object({
				name: z.string({ message: "O nome é obrigatório!" }).trim().min(6),
				price: z
					.number()
					.gt(0, { message: "O valor deve ser maior do que 0!" }),
			})

			const { name, price } = bodySchema.parse(request.body)

			await knex<ProductRepository>("products").insert({ name, price })

			return response.status(201).json()
		} catch (error) {
			next(error)
		}
	}

	// PUT
	async update(request: Request, response: Response, next: NextFunction) {
		try {
			const id = z
				.string()
				.transform((value) => Number(value))
				.refine((value) => !isNaN(value), {
					message: "ID precisa ser um numero!",
				})
				.parse(request.params.id)

			const bodySchema = z.object({
				name: z.string({ message: "O nome é obrigatório!" }).trim().min(6),
				price: z
					.number()
					.gt(0, { message: "O valor deve ser maior do que 0!" }),
			})

			const { name, price } = bodySchema.parse(request.body)

      const product = await knex<ProductRepository>("products")
				.select()
				.where({ id })
				.first()

			if (!product) {
        throw new AppError("Produto nao encontrado!")
			}

			await knex<ProductRepository>("products")
				.update({ name, price, updated_at: knex.fn.now() })
				.where({ id })

			return response.json()
		} catch (error) {
			next(error)
		}
	}

	// DELETE
	async remove(request: Request, response: Response, next: NextFunction) {
		try {
			const id = z
				.string()
				.transform((value) => Number(value))
				.refine((value) => !isNaN(value), {
					message: "ID precisa ser um numero!",
				})
				.parse(request.params.id)

			await knex<ProductRepository>("products").delete().where({ id })

			const product = await knex<ProductRepository>("products")
				.select()
				.where({ id })
				.first()

			if (!product) {
        throw new AppError("Produto nao encontrado!")
			}

			return response.json()
		} catch (error) {
			next(error)
		}
	}
}

export { ProductController }
