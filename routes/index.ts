import { Router } from "express";
import blogs from "./blogs";

const router = Router();

router.use("/blogs", blogs);

export default router;
