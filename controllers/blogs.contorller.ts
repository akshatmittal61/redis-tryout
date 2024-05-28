import { Request, Response } from "express";
import { http } from "../constants/enum";
import log from "../log";
import services from "../services";
import { getString } from "../utils/safety";

export const getAllBlogs = async (_: Request, res: Response) => {
	try {
		const allBlogs = services.blogs.findAll();
		return res
			.status(http.status.SUCCESS)
			.json({ message: http.message.SUCCESS, data: allBlogs });
	} catch (error: any) {
		log.error(error);
		return res
			.status(http.status.INTERNAL_SERVER_ERROR)
			.json({ message: http.message.INTERNAL_SERVER_ERROR });
	}
};

export const getBlogById = async (req: Request, res: Response) => {
	try {
		const id = getString(req.params.id);
		const blog = await services.blogs.findById(id);
		if (!blog) {
			return res
				.status(http.status.NOT_FOUND)
				.json({ message: http.message.NOT_FOUND });
		}
		return res
			.status(http.status.SUCCESS)
			.json({ message: http.message.SUCCESS, data: blog });
	} catch (error: any) {
		log.error(error);
		return res
			.status(http.status.INTERNAL_SERVER_ERROR)
			.json({ message: http.message.INTERNAL_SERVER_ERROR });
	}
};

export const createBlog = async (req: Request, res: Response) => {
	try {
		const title = getString(req.body.title);
		const content = getString(req.body.content);
		const blog = await services.blogs.create({ title, content });
		return res
			.status(http.status.CREATED)
			.json({ message: http.message.SUCCESS, data: blog });
	} catch (error: any) {
		log.error(error);
		return res
			.status(http.status.INTERNAL_SERVER_ERROR)
			.json({ message: http.message.INTERNAL_SERVER_ERROR });
	}
};

export const updateBlog = async (req: Request, res: Response) => {
	try {
		const id = getString(req.params.id);
		const title = getString(req.body.title);
		const content = getString(req.body.content);
		const blog = await services.blogs.update({ id }, { title, content });
		return res
			.status(http.status.SUCCESS)
			.json({ message: http.message.SUCCESS, data: blog });
	} catch (error: any) {
		log.error(error);
		return res
			.status(http.status.INTERNAL_SERVER_ERROR)
			.json({ message: http.message.INTERNAL_SERVER_ERROR });
	}
};

export const removeBlog = async (req: Request, res: Response) => {
	try {
		const id = getString(req.params.id);
		const blog = await services.blogs.remove({ id });
		return res
			.status(http.status.REMOVED)
			.json({ message: http.message.SUCCESS, data: blog });
	} catch (error: any) {
		log.error(error);
		return res
			.status(http.status.INTERNAL_SERVER_ERROR)
			.json({ message: http.message.INTERNAL_SERVER_ERROR });
	}
};
