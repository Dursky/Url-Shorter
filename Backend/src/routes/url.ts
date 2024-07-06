import {Router} from "express"
import {createShortenedUrl, getUrls, deleteUrl} from "../controllers/urlController"
import {auth} from "../middlewares/auth"

const router = Router()

router.post("/", auth, createShortenedUrl)
router.get("/", auth, getUrls)
router.delete("/:shortUrl", auth, deleteUrl)

export default router
