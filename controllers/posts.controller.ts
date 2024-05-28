import { Request, Response } from "express";
import log from "../log";
import { http } from "../constants/enum";
import axios from "axios";

/* const jsonPlaceholder = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
}); */

export const getAllPosts = async (_: Request, res: Response) => {
    try {
        const start = new Date().getTime();
        // const allPosts = await jsonPlaceholder.get("/posts");
        const allPosts = await axios.get("https://random-word-api.herokuapp.com/all");
        const end = new Date().getTime();
        return res
            .status(http.status.SUCCESS)
            .json({
                message: http.message.SUCCESS,
                profiling: {
                    time: end - start
                },
                data: allPosts.data
            });
    } catch (error: any) {
        log.error(error);
        return res
            .status(http.status.INTERNAL_SERVER_ERROR)
            .json({ message: http.message.INTERNAL_SERVER_ERROR });
    }
};