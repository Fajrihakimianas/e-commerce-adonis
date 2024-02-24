import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async index({}: HttpContextContract) {
    return 'Hello World'
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
