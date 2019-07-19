/**
 * Created by slipkinem on 3/15/2018 at 3:54 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
export class OptionItem {
  private _area: string
  private _content: string
  private _createTime: string
  private _createUser: number
  private _description: string
  private _displayValue: string
  private _id: number
  private _keyWord: string
  private _memo: string
  private _parentId: string
  private _sort: number
  private _status: number
  private _updateTime: string
  private _updateUser: string
  private _value: string

  constructor (displayValue: string, value: string) {
    this._displayValue = displayValue
    this._value = value
  }

  get area (): string {
    return this._area
  }

  set area (value: string) {
    this._area = value
  }

  get content (): string {
    return this._content
  }

  set content (value: string) {
    this._content = value
  }

  get createTime (): string {
    return this._createTime
  }

  set createTime (value: string) {
    this._createTime = value
  }

  get createUser (): number {
    return this._createUser
  }

  set createUser (value: number) {
    this._createUser = value
  }

  get description (): string {
    return this._description
  }

  set description (value: string) {
    this._description = value
  }

  get displayValue (): string {
    return this._displayValue
  }

  set displayValue (value: string) {
    this._displayValue = value
  }

  get id (): number {
    return this._id
  }

  set id (value: number) {
    this._id = value
  }

  get keyWord (): string {
    return this._keyWord
  }

  set keyWord (value: string) {
    this._keyWord = value
  }

  get memo (): string {
    return this._memo
  }

  set memo (value: string) {
    this._memo = value
  }

  get parentId (): string {
    return this._parentId
  }

  set parentId (value: string) {
    this._parentId = value
  }

  get sort (): number {
    return this._sort
  }

  set sort (value: number) {
    this._sort = value
  }

  get status (): number {
    return this._status
  }

  set status (value: number) {
    this._status = value
  }

  get updateTime (): string {
    return this._updateTime
  }

  set updateTime (value: string) {
    this._updateTime = value
  }

  get updateUser (): string {
    return this._updateUser
  }

  set updateUser (value: string) {
    this._updateUser = value
  }

  get value (): string {
    return this._value
  }

  set value (value: string) {
    this._value = value
  }
}
