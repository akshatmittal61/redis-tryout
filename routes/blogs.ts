import { Router } from "express";
import controllers from "../controllers";
import middlewares from "../middlewares";

const router = Router();

router.route("/").get(controllers.blogs.getAllBlogs);
router.route("/:id").get(controllers.blogs.getBlogById);

router.use(middlewares.isLoggedIn);
router.route("/").post(controllers.blogs.createBlog);
router
	.route("/:id")
	.patch(controllers.blogs.updateBlog)
	.delete(controllers.blogs.removeBlog);

export default router;
