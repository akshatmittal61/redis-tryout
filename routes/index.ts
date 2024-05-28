import { Router } from "express";
import blogs from "./blogs";
import posts from "./posts";

const router = Router();

router.use("/blogs", blogs);
router.use("/posts", posts);

export default router;
