import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class ProductCategoriesController {
  public async index({ response, request }: HttpContextContract) {
    const id = request.input('id')
    const limit = request.input('limit') || 10
    const name = request.input('name')
    const showProduct = request.input('show_product')

    if (id) {
      const productCategory = await Database.from('product_categories')
        .select('*')
        .where('product_categories.id', id)
        .join('products', 'product_categories.id', 'products.categories_id')
        .paginate(limit)

      if (productCategory) {
        let { meta, data } = productCategory.toJSON()
        return response.ok({ meta, data })
      } else {
        return response.notFound({ message: 'Product categories not found' })
      }
    }

    const productCategory = await Database.from('product_categories')
      .select('*')
      .where((builder) => {
        if (name) {
          builder.where('product_categories.name', 'like', `%${name}%`)
        }

        if (showProduct) {
          builder.whereIn(
            'products_categories.id',
            Database.from('products')
              .select('categories_id')
              .where('products.categories_id', showProduct)
          )
        }
      })
      .paginate(limit)

    let { meta, data } = productCategory.toJSON()

    return response.ok({ meta, data })
  }
}
