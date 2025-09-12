import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  // plugins: [react(), tailwindcss()],
  plugins: [react(),],
  server: {
    host: '0.0.0.0', // This makes the server accessible on your local network
    port: 5173, // Or your custom port
  },
});
