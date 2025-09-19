import { Router } from "express";
import { ChangePassword, RegisterUser, loginUSer } from "../controllers/users.controllers.js";

const router = Router();

router.post('/auth/register', RegisterUser);
router.post('/auth/login', loginUSer);
router.patch('/auth/changepass', ChangePassword);

export default router;