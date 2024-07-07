import {Router} from "express"
import {createShortenedUrl, getUrls, deleteUrl, getUrlStats} from "../controllers/urlController"
import {auth} from "../middlewares/auth"

const router = Router()

router.post("/", auth, createShortenedUrl)
router.get("/short/", auth, getUrls)
router.get("/stats/:shortUrl", auth, getUrlStats)
router.delete("/short/:shortUrl", auth, deleteUrl)

export default router
