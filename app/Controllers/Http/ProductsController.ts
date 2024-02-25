import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { schema } from '@ioc:Adonis/Core/Validator'
import Product from 'App/Models/Product'

export default class ProductsController {
  public async index({}: HttpContextContract) {
    return 'Hello World'
  }

  public async show({ response, request }: HttpContextContract) {
    const id = request.input('id')
    const limit = request.input('limit') || 10
    const name = request.input('name')
    const description = request.input('description')
    const tags = request.input('tags')
    const categories = request.input('categories') || 1
    const priceFrom = request.input('price_from')
    const priceTo = request.input('price_to')

    if (id) {
      const product = await Database.from('products')
        .select('*')
        .where('products.id', id)
        .join('product_categories', 'products.categories_id', 'product_categories.id')
        .join('product_galleries', 'products.id', 'product_galleries.products_id')
        .paginate(limit)

      if (product) {
        let { meta, data } = product.toJSON()
        return response.ok({ meta, data })
      } else {
        return response.notFound({ message: 'Product not found' })
      }
    }

    const product = await Database.from('products')
      .select('*')
      .join('product_categories', 'products.categories_id', 'product_categories.id')
      .join('product_galleries', 'products.id', 'product_galleries.products_id')
      .where((builder) => {
        if (name) {
          builder.where('products.name', 'like', `%${name}%`)
        }

        if (description) {
          builder.where('products.description', 'like', `%${description}%`)
        }

        if (tags) {
          builder.where('products.tags', 'like', `%${tags}%`)
        }

        if (categories) {
          builder.where('products.categories_id', categories)
        }

        if (priceFrom) {
          builder.where('products.price', '>=', priceFrom)
        }

        if (priceTo) {
          builder.where('products.price', '<=', priceTo)
        }
      })
      .paginate(limit)

    let { meta, data } = product.toJSON()

    return response.ok({ meta, data })
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate({
      schema: schema.create({
        name: schema.string(),
        price: schema.number(),
        description: schema.string(),
        // tags: schema.string(),
        categoriesId: schema.number(),
      }),
      messages: {
        'name.required': 'Name field is required',
        'price.required': 'Price field is required',
        'description.required': 'Description field is required',
        'categoriesId.required': 'Categories field is required',
      },
    })

    // console.log(payload)

    let { name, price, description, categoriesId } = payload

    const result = await Product.create({
      name,
      price,
      description,
      categories_id: categoriesId,
    })

    return response.ok({ data: result })
  }
}
