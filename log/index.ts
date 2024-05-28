import fs from "fs";

export const log = (message: string, level: string, dir: string) => {
	const date = new Date();
	const fileName = `${dir}/${date.getFullYear()}-${date.getMonth()}-${date.getDate()}.log`;
	const log = `[${date.toISOString()}] [${level.toUpperCase()}] ${message}\n`;
	fs.appendFileSync(fileName, log);
	switch (level) {
		case "info":
			console.info("\x1b[32m%s\x1b[37m", log);
			break;
		case "warn":
			console.warn("\x1b[33m%s\x1b[0m", log);
			break;
		case "error":
			console.error("\x1b[31m%s\x1b[0m", log);
			break;
		case "debug":
			console.debug("\x1b[34m%s\x1b[0m", log);
			break;
		case "verbose":
			console.log("\x1b[35m%s\x1b[0m", log);
			break;
		case "silly":
			console.log("\x1b[36m%s\x1b[0m", log);
			break;
		case "http":
			console.log("\x1b[35m%s\x1b[0m", log);
			break;
		default:
			console.log("\x1b[37m%s\x1b[0m", log);
			break;
	}
};

class Logger {
	private readonly directory: string;

	constructor(dir: string) {
		this.directory = dir;
		fs.mkdirSync(this.directory, { recursive: true });
	}

	info(message: string) {
		log(message, "info", this.directory);
	}

	warn(message: string) {
		log(message, "warn", this.directory);
	}

	error(message: string) {
		log(message, "error", this.directory);
	}

	debug(message: string) {
		log(message, "debug", this.directory);
	}

	verbose(message: string) {
		log(message, "verbose", this.directory);
	}

	silly(message: string) {
		log(message, "silly", this.directory);
	}

	http(message: string) {
		log(message, "http", this.directory);
	}

	log(message: string) {
		log(message, "log", this.directory);
	}
}

export default new Logger("logs");
