import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transaction from 'App/Models/Transaction'

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
          query.preload('product')
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
        query.preload('product')
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

  public async store({}: HttpContextContract) {
    return 'Hello World'
  }

  public async update({}: HttpContextContract) {
    return 'Hello World'
  }

  public async destroy({}: HttpContextContract) {
    return 'Hello World'
  }
}
