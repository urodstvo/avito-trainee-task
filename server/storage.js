const makeCounter = () => {
  let count = 0;
  return () => count++;
};

export class InMemoryStorage {
  constructor() {
    this.items = [];
    this.counter = makeCounter();
  }

  getItems() {
    return this.items;
  }

  getItem(id) {
    const item = this.items.find((i) => i.id === id);
    if (!item) {
      throw new Error("Item not found");
    }

    return item;
  }

  addItem(item) {
    const new_item = {
      ...item,
      id: this.counter(),
    };
    this.items.push(new_item);

    return new_item;
  }

  removeItem(id) {
    this.items = this.items.filter((i) => i.id !== id);
  }

  updateItem(item) {
    const index = this.items.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      this.items[index] = item;
    } else {
      throw new Error("Item not found");
    }
  }
}
