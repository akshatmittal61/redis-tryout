import axios from "axios";
import { Request, Response } from "express";
import { http } from "../constants/enum";
import log from "../log";
import cache from "../cache";

/* const jsonPlaceholder = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
}); */

export const getAllPosts = async (_: Request, res: Response) => {
    try {
        const start = new Date().getTime();
        const allWords = await cache.fetch("posts", async () => {
            const res = await axios.get("https://random-word-api.herokuapp.com/all");
            const allWords: Array<string> = res.data;
            return allWords;
        });
        const end = new Date().getTime();
        return res
            .status(http.status.SUCCESS)
            .json({
                message: http.message.SUCCESS,
                profiling: {
                    time: end - start
                },
                data: allWords
            });
    } catch (error: any) {
        log.error(error);
        return res
            .status(http.status.INTERNAL_SERVER_ERROR)
            .json({ message: http.message.INTERNAL_SERVER_ERROR });
    }
};
