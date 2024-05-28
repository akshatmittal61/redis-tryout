import models from "../models";
import { Blog } from "../types/blog";
import { getObjectFromMongoResponse } from "../utils/parser";
import { getNonNullValue } from "../utils/safety";

export const findOne = async (query: Partial<Blog>): Promise<Blog | null> => {
	const res = await models.Blog.findOne(query);
	return getObjectFromMongoResponse<Blog>(res);
};

export const findById = async (id: string): Promise<Blog | null> => {
	const res = await models.Blog.findById(id).catch((error: any) => {
		if (error.kind === "ObjectId") return null;
		return Promise.reject(error);
	});
	return getObjectFromMongoResponse<Blog>(res);
};

export const find = async (
	query: Partial<Blog>
): Promise<Blog | Blog[] | null> => {
	const res = await models.Blog.find(query);
	if (res.length > 1) {
		const parsedRes = res
			.map((blog) => getObjectFromMongoResponse<Blog>(blog))
			.filter((blog) => blog !== null) as Blog[];
		if (parsedRes.length > 0) return parsedRes;
	} else if (res.length === 1) {
		return getObjectFromMongoResponse<Blog>(res[0]);
	}
	return null;
};

export const findAll = async (): Promise<Array<Blog>> => {
	const res = await models.Blog.find({});
	const parsedRes = res
		.map((blog) => getObjectFromMongoResponse<Blog>(blog))
		.filter((blog) => blog !== null) as Blog[];
	if (parsedRes.length > 0) return parsedRes;
	return [];
};

export const create = async (
	blog: Omit<Blog, "id" | "createdAt" | "updatedAt">
): Promise<Blog> => {
	const res = await models.Blog.create(blog);
	return getNonNullValue(getObjectFromMongoResponse<Blog>(res));
};

export const update = async (
	query: Partial<Blog>,
	update: Partial<Omit<Blog, "id" | "createdAt" | "updatedAt">>
): Promise<Blog | null> => {
	const res = query.id
		? await models.Blog.findByIdAndUpdate(query.id, update, { new: true })
		: await models.Blog.findOneAndUpdate(query, update, { new: true });
	return getObjectFromMongoResponse<Blog>(res);
};

export const remove = async (query: Partial<Blog>): Promise<Blog | null> => {
	const res = query.id
		? await models.Blog.findByIdAndDelete(query.id)
		: await models.Blog.findOneAndDelete(query);
	return getObjectFromMongoResponse<Blog>(res);
};
