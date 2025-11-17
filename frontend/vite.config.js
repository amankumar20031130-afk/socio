import daisyui from 'daisyui';
//import daisyUIThemes from "daisyui/src/theming/themes";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import themes from 'daisyui/theme/object';

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react(), daisyui],
  server: {
    port: 3000,
	proxy:{
		"/api":{
			target: "http://localhost:5000",
			changeOrigin: true,
		}
	}
  },
  
  
})
