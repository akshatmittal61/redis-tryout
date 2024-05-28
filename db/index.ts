import mongoose from "mongoose";
import { dbUri } from "../config";
import log from "../log";

declare global {
	// eslint-disable-next-line no-unused-vars
	var isConnected: boolean;
}

export class DatabaseManager {
	constructor() {}

	public async connect() {
		if (global.isConnected) {
			log.info("Using existing database connection");
			return;
		}

		const db = await mongoose
			.connect(dbUri)
			.then((db) => {
				log.info("Connected to MongoDB");
				return db;
			})
			.catch((err) => {
				log.error(`Error connecting to MongoDB: ${err}`);
				return err;
			});

		global.isConnected = db.connections[0].readyState === 1;
	}
}

export const db = new DatabaseManager();
