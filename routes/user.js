import express from 'express';
import { login, register, logout, getMyProfile, getAllUsers, updateUser, deleteUser } from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post("/login", login);
router.post("/new", register);
router.get("/logout", logout);


router.get("/me", isAuthenticated, getMyProfile);
router.get("/all", isAuthenticated, getAllUsers);
router.put("/update", isAuthenticated, updateUser);
router.delete("/delete", isAuthenticated, deleteUser);



export default router;