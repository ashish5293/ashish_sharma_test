import { App } from "./App";
const app = new App(8082);

function uncaughtException(err: Error): void {
    console.error(err.message, {
        tags: ["uncaught", "exception"],
        stack: err.stack,
    });
    process.exit(1);
}
process.on("uncaughtException", uncaughtException);
process.on("SIGINT", () => {
    app.stop().then(() => process.exit(0));
});

app.start().catch(uncaughtException);
