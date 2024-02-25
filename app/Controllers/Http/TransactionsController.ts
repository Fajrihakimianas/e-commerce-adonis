import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transaction from 'App/Models/Transaction'
import TransactionItem from 'App/Models/TransactionItem'
import TransactionValidator from 'App/Validators/TransactionValidator'

export default class TransactionsController {
  public async index({ auth, request, response }: HttpContextContract) {
    const user = auth.user!

    const id = request.input('id')
    const limit = request.input('limit') || 10
    const status = request.input('status')

    if (id) {
      const transaction = await Transaction.query()
        .where('id', id)
        .preload('items', (query) => {
          query.preload('products')
        })
        .paginate(1, limit)

      // console.log(transaction)

      if (transaction) {
        let { meta, data } = transaction.toJSON()
        return response.ok({ meta, data })
      } else {
        return response.notFound({ message: 'Transaction not found' })
      }
    }

    const transaction = await Transaction.query()
      .preload('items', (query) => {
        query.preload('products')
      })
      .where('users_id', user.id)
      .where((builder) => {
        if (status) {
          builder.where('status', status)
        }
      })
      .paginate(1, limit)

    let { meta, data } = transaction.toJSON()

    return response.ok({ meta, data })
  }

  public async show({}: HttpContextContract) {
    return 'Hello World'
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const payload = await request.validate(TransactionValidator)

    let { address, status, items, totalPrice, shippingPrice } = payload

    const transaction = await Transaction.create({
      address,
      users_id: auth.user!.id,
      status,
      total_price: totalPrice,
      shipping_price: shippingPrice,
    })

    console.log(transaction.id)

    for (const product of items) {
      await TransactionItem.create({
        users_id: auth.user!.id,
        products_id: product['id'],
        transactions_id: transaction.id,
        quantity: product['quantity'],
      })
    }

    await transaction?.preload('items', (query) => {
      query.preload('products')
    })

    return response.ok({ data: transaction })
  }

  public async update({}: HttpContextContract) {
    return 'Hello World'
  }

  public async destroy({}: HttpContextContract) {
    return 'Hello World'
  }
}
