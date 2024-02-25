import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    let result = await User.query().orderBy('id', 'desc').paginate(1, 10)

    let { meta, data } = result.toJSON()

    return response.ok({ meta, data })
  }

  public async show({}: HttpContextContract) {
    return 'Hello World'
  }

  public async store({}: HttpContextContract) {
    return 'Hello World'
  }

  public async update({ auth, request, response }: HttpContextContract) {
    const user = auth.user!

    const req = await request.validate({
      schema: schema.create({
        username: schema.string(
          {
            trim: true,
            escape: true,
          },
          [rules.minLength(3), rules.maxLength(100)]
        ),
        email: schema.string(
          {
            trim: true,
            escape: true,
          },
          [rules.email(), rules.unique({ table: 'users', column: 'email' })]
        ),
        password: schema.string(),
      }),
      messages: {
        'username.required': 'Username is required',
      },
    })

    const { username, email, password } = req

    user.username = username
    user.email = email
    user.password = password

    await user.save()

    return response.ok({ data: user })
  }

  public async destroy({}: HttpContextContract) {
    return 'Hello World'
  }
}
