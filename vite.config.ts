// https://vitejs.dev/config/
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    server: {
        hmr: {
            overlay: false, // Disable the overlay for HMR errors
        },
        host: "0.0.0.0", // Allow connections from Docker
        port: 3001, // Change Vite's port to 3001
        strictPort: true, // Ensure it doesn’t fallback to another port
        fs: {
            strict: false
        },
    },
    build: {
        outDir: "dist", // Change the output directory to dist
        emptyOutDir: true, // Empty the output directory before building
    },
    base: "/",
    ssr: {
        noExternal: ["@clerk/clerk-react"]
  }
});


