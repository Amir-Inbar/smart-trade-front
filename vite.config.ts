// https://vitejs.dev/config/
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    server: {
        host: "0.0.0.0", // Allow connections from Docker
        port: 3001, // Change Vite's port to 3001
        strictPort: true, // Ensure it doesn’t fallback to another port
        fs: {
            strict: false
        }
    }
});


