import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { v4 as uuid } from 'uuid'
import RegisterValidator from 'App/Validators/RegisterValidator'

export default class AuthController {
  public async register({ auth, request, response }: HttpContextContract) {
    const payload = await request.validate(RegisterValidator)

    const { username, email, password, phone } = payload

    const saveUser = await User.create({
      username,
      email,
      password,
      phone,
    })

    // const token = await saveUser.related('tokens').create({
    //   tokens: uuid(),
    //   email: saveUser.email,
    //   password: saveUser.password,
    // })

    // const token = await auth.use('api').attempt(payload.email, payload.password)

    return response.ok({ saveUser })
  }

  public async login({ auth, request }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    const token = await auth.use('api').attempt(email, password)

    return token
  }

  public async logout({}: HttpContextContract) {
    return 'Hello World'
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
