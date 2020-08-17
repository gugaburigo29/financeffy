import "reflect-metadata";
import app from "./src/app";

async function init() {
    await app.start();
}

init();
