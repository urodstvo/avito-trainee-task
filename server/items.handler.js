import { InMemoryStorage } from "./storage.js";

// In-memory хранилище для объявлений
const itemsStorage = new InMemoryStorage();

const ItemTypes = {
  REAL_ESTATE: "Недвижимость",
  AUTO: "Авто",
  SERVICES: "Услуги",
};

export const createItem = (req, res) => {
  const { name, description, location, type, ...rest } = req.body;
  const user = req.user;

  // Validate common required fields
  if (!name || !description || !location || !type) {
    return res.status(400).json({ error: "Missing required common fields" });
  }

  switch (type) {
    case ItemTypes.REAL_ESTATE:
      if (!rest.propertyType || !rest.area || !rest.rooms || !rest.price) {
        return res.status(400).json({ error: "Missing required fields for Real estate" });
      }
      break;
    case ItemTypes.AUTO:
      if (!rest.brand || !rest.model || !rest.year || !rest.mileage) {
        return res.status(400).json({ error: "Missing required fields for Auto" });
      }
      break;
    case ItemTypes.SERVICES:
      if (!rest.serviceType || !rest.experience || !rest.cost) {
        return res.status(400).json({ error: "Missing required fields for Services" });
      }
      break;
    default:
      return res.status(400).json({ error: "Invalid type" });
  }

  const item = itemsStorage.addItem({
    user_id: user.id,
    name,
    description,
    location,
    type,
    ...rest,
  });
  return res.status(201).json(item);
};

export const getItems = (req, res) => {
  return res.json(itemsStorage.getItems());
};

export const getItem = (req, res) => {
  try {
    const item = itemsStorage.getItem(parseInt(req.params.id, 10));
    return res.json(item);
  } catch {
    return res.status(404).send("Item not found");
  }
};

export const updateItem = (req, res) => {
  try {
    const item = itemsStorage.getItem(parseInt(req.params.id, 10));
    if (item.user_id !== req.user.id) {
      return res.status(403).send("Forbidden");
    }
    itemsStorage.updateItem({ id: parseInt(req.params.id, 10), ...req.body });
    return res.json(item);
  } catch {
    return res.status(404).send("Item not found");
  }
};

export const deleteItem = (req, res) => {
  try {
    const item = itemsStorage.getItem(parseInt(req.params.id, 10));
    if (item.user_id !== req.user.id) {
      return res.status(403).send("Forbidden");
    }

    itemsStorage.removeItem(item.id);
    return res.status(204).send();
  } catch {
    return res.status(404).send("Item not found");
  }
};
