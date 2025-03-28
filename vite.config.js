import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
// import tailwindScrollBar from "tailwind-scrollbar";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],	
})
