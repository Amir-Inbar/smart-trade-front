// https://vitejs.dev/config/
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    optimizeDeps: {
        force: true,
        include: ['mantine-react-table', '@mantine/hooks']
    },
    server: {
        fs: {
            strict: false
        }
    }
});
