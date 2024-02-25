import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    let result = await Database.from('users')
      .select('id', 'username', 'email', 'phone', 'roles', 'created_at', 'updated_at')
      .orderBy('id', 'desc')
      .paginate(1, 10)

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
