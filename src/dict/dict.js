import { get } from 'lodash-es'
class _data_Dictionary {
  constructor(data) {
    this._data_ = data
    data.forEach((item) => {
      this[item.name] = item
    })
  }

  // 获取所有id
  getAllIds() {
    return this._data_.map((item) => item.id)
  }

  // 获取所有name
  getAllNames() {
    return this._data_.map((item) => item.name)
  }

  // 根据id获取对应的name
  getName(id) {
    return get(
      this._data_.find((item) => item.id == id),
      'name'
    )
  }

  // 根据name获取对应的id
  getId(name) {
    return this._data_.find((item) => item.name === name).id
  }
  // 根据id获取对应的tag
  getTag(id) {
    return get(
      this._data_.find((item) => item.id == id),
      'tag'
    )
  }
}
export default _data_Dictionary
