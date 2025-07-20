import { AppError } from "@/utils/AppError"
import { NextFunction, Request, Response } from "express"

class ProductController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      //
      return response.json({ message: "ok" })
    } catch (error) {
      // vamos utilizar o next para passar, de forma assincrona, o nosso erro para o express.
      next(error)
    }
  }
}

export { ProductController }