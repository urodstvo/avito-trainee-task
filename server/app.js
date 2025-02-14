import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { createItem, getItem, updateItem, deleteItem, getItems } from "./items.handler.js";
import { getMe, login, logout, register, authMiddleware } from "./auth.handler.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Создание нового объявления
app.post("/items", authMiddleware, createItem);

// Получение всех объявлений
app.get("/items", getItems);

// Получение объявления по его id
app.get("/items/:id", getItem);

// Обновление объявления по его id
app.put("/items/:id", authMiddleware, updateItem);

// Удаление объявления по его id
app.delete("/items/:id", authMiddleware, deleteItem);

// Регистрация в системе
app.post("/register", register);

// Вход в систему
app.post("/login", login);

// Выход из системы
app.post("/logout", logout);

// Получение информации о пользователе
app.get("/me", authMiddleware, getMe);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
