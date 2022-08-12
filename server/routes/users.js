// DEPENDENCIES
import express from "express"
import {editUser, login, register} from "../controllers/user.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.put("/edit", editUser);

export default router;