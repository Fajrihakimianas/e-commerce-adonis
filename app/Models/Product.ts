import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import ProductGallery from './ProductGallery'
import ProductCategory from './ProductCategory'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public price: number

  @column()
  public description: string

  @column()
  public tags: string

  @column()
  public categories_id: number

  @hasMany(() => ProductGallery, {
    foreignKey: 'products_id',
  })
  public galleries: HasMany<typeof ProductGallery>

  @belongsTo(() => ProductCategory, {
    foreignKey: 'categories_id',
  })
  public category: BelongsTo<typeof ProductCategory>

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @column.dateTime({ serializeAs: null })
  public deleted_at: DateTime
}
