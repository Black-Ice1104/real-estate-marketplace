// Manage different routes of advertisement at backend
import express from "express";
import * as ad from "../controllers/ad.js";
import { requireSignin } from "../middlewares/auth.js";

const router = express.Router();
router.post("/upload-image", requireSignin, ad.uploadImage);
router.post("/remove-image", requireSignin, ad.removeImage);
router.post("/ad", requireSignin, ad.create);
router.get("/ads", ad.ads);
router.get("/ad/:slug", ad.read);
router.post("/wishlist", requireSignin, ad.addToWishlist);
router.delete("/wishlist/:adId", requireSignin, ad.removeFromWishlist);
router.post("/contact-seller", requireSignin, ad.contactSeller);

// router.get("/user-ads", requireSignin, ad.userAds);
router.get("/user-ads/:page", requireSignin, ad.userAds);
router.put("/ad/:_id", requireSignin, ad.update);

router.get("/enquired-properties", requireSignin, ad.enquiredProperties);
router.get("/wishlist", requireSignin, ad.wishlist);
router.delete("/ad/:_id", requireSignin, ad.remove);

router.get("/ads-for-sell", ad.adsForSell);
router.get("/ads-for-rent", ad.adsForRent);
router.get("/search", ad.search);
export default router;