import { Router } from "express";
import { createUser, deleteAllUsers } from "./controller/UserController";
import { createAccess, getAllAccesses } from "./controller/AccessController";
import { createStore, getAllStore } from "./controller/StoreController";
import { createProduct } from "./controller/ProductController";

export const router = Router()

router.post("/user", createUser)
router.delete("/delete-all-users", deleteAllUsers)

router.post("/access", createAccess)
router.get("/accesses", getAllAccesses)

router.get("/stores", getAllStore)
router.post("/store/:userId", createStore)

router.post("/product/:storeId", createProduct)