import { defineConfig } from "rolldown";

export default defineConfig({
    input: "frontend/src/main.ts",
    output: {
        format: "esm",
        file: "src/static/app.js",
        codeSplitting: false,
    },
});