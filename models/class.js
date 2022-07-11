class Menu {
  constructor(id, name, price, stock, createdAt, category, CategoryId) {
    this.id = id
    this.name = name
    this.price = price
    this.stock = stock
    this.createdAt = createdAt
    this.category = category
    this.CategoryId = CategoryId
  }

  get formattedPrice() {
    return `Rp. ${this.price}`
  }
}

class Category {
  constructor(id, name) {
    this.id = id
    this.name = name
  }
}

module.exports = { Menu, Category }