import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'

export default class TransactionItem extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public users_id: number

  @column()
  public products_id: number

  @column()
  public transactions_id: number

  @column()
  public quantity: number

  @hasOne(() => Product, {
    foreignKey: 'products_id',
  })
  public product: HasOne<typeof Product>

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime
}
