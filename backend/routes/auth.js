// Manage different routes of authentication at backend
import express from "express";
import * as auth from '../controllers/auth.js';
import {requireSignin} from "../middlewares/auth.js";

const router = express.Router();

// get post put delete
router.get("/", requireSignin, auth.welcome); // can't access welcome page unless login
router.post("/pre-register", auth.preRegister);
router.post("/register", auth.register);
router.post("/login", auth.login);
router.post("/forgot-password", auth.forgotPassword);
router.post("/access-account", auth.accessAccount);
router.get("/refresh-token", auth.refreshToken);
router.get("/current-user", requireSignin, auth.currentUser);
router.get("/profile/:username", auth.publicProfile); // colon as a prefix makes username a dynamic variable
router.put("/update-password", requireSignin, auth.updatePassword);
router.put("/update-profile", requireSignin, auth.updateProfile);

router.get("/agents", auth.agents);
router.get("/agent-ad-count/:_id", auth.agentAdCount);
router.get("/agent/:username", auth.agent);

export default router; // default: if import a name inexisted here, import "router"