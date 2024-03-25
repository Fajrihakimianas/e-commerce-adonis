import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AuthController {
  public async register({ auth, request, response }: HttpContextContract) {
    const payload = await request.validate(RegisterValidator)

    const { username, email, password, phone } = payload

    const user = await User.create({
      username,
      email,
      password,
      phone,
    })

    const token = await auth.use('api').attempt(email, password)

    return response.ok({ meta: { ...token }, data: user })
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const req = await request.validate({
      schema: schema.create({
        email: schema.string({}, [rules.email()]),
        password: schema.string({}, [rules.minLength(8)]),
      }),
      messages: {
        'email.required': 'Email field is required',
        'password.required': 'Password field is required',
        'password.minLength': 'Password must be at least 8 characters',
      },
    })

    const email = req.email
    const password = req.password

    const token = await auth.use('api').attempt(email, password)

    return response.ok({ meta: { ...token } })
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.logout()

    return 'Logged out successfully'
  }

  public async forgotPassword({}: HttpContextContract) {
    return 'Hello World'
  }

  public async resetPassword({}: HttpContextContract) {
    return 'Hello World'
  }

  public async updatePassword({}: HttpContextContract) {
    return 'Hello World'
  }
}
