import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TransactionValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string([ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string([
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    address: schema.string(),
    items: schema.array().members(
      schema.object().members({
        id: schema.number(),
        quantity: schema.number(),
      })
    ),
    status: schema.string(),
    totalPrice: schema.number(),
    shippingPrice: schema.number(),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'items.required': 'Items is required',
    'items.*.id.required': 'Product id is required',
    'items.*.quantity.required': 'Qty is required',
    'address.required': 'Address is required',
    'totalPrice.required': 'Total price is required',
    'shippingPrice.required': 'Shipping price is required',
    'status.required': 'Status is required',
  }
}
