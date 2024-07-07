import {Router} from "express"
import {createShortenedUrl, getUrls, deleteUrl} from "../controllers/urlController"
import {auth} from "../middlewares/auth"

const router = Router()

router.post("/", auth, createShortenedUrl)
router.get("/short/", auth, getUrls)
router.delete("/short/:shortUrl", auth, deleteUrl)

export default router
