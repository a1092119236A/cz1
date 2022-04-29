import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    // host: '10.0.0.247',
    port: 5555,
    open: true,
    https: false
  }
});
