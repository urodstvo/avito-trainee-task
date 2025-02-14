import { genSaltSync, hashSync, compareSync } from "bcrypt";
import { InMemoryStorage } from "./storage.js";

const createAccessToken = (user) => {
  const saltRounds = 10;
  const userString = JSON.stringify(user);
  const hash = hashSync(userString, saltRounds);
  return hash;
};

const tokenUserMap = new Map();

// In-memory хранилище для пользователей
const usersStorage = new InMemoryStorage();

export const register = (req, res) => {
  const { username, password } = req.body;

  if (usersStorage.getItems().find((u) => u.username === username)) {
    return res.status(400).json({ error: "User already exists" });
  }

  const salt = genSaltSync(12);
  const hashedPassword = hashSync(password, salt);
  const user = usersStorage.addItem({ username, password: hashedPassword });

  const access_token = createAccessToken(user);
  tokenUserMap.set(access_token, user);
  return res.status(201).json({ access_token });
};

export const login = (req, res) => {
  const { username, password } = req.body;
  const user = usersStorage
    .getItems()
    .find((u) => u.username === username && compareSync(password, u.password));
  if (user) {
    const access_token = createAccessToken(user);
    tokenUserMap.set(access_token, user);
    return res.status(200).json({ access_token });
  } else {
    return res.status(401).json({ error: "Invalid credentials" });
  }
};

export const logout = (req, res) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.split(" ")[1];
    tokenUserMap.delete(token);
    return res.status(200).send();
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export const getMe = (req, res) => {
  const user = req.user;
  res.status(200).json({ user, password: undefined });
};

export const authMiddleware = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  const user = tokenUserMap.get(token);
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  req.user = user;
  next();
};
