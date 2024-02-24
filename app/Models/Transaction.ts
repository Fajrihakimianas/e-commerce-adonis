import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import TransactionItem from './TransactionItem'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public users_id: number

  @column()
  public address: string

  @column()
  public payment: string

  @column()
  public total_price: number

  @column()
  public shipping_price: number

  @column()
  public status: string

  @belongsTo(() => User, {
    foreignKey: 'users_id',
  })
  public user: BelongsTo<typeof User>

  @hasMany(() => TransactionItem, {
    foreignKey: 'transactions_id',
  })
  public items: HasMany<typeof TransactionItem>

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @column.dateTime({ serializeAs: null })
  public deleted_at: DateTime
}
