import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default ()=>{
    return defineConfig({
        plugins: [react()],
        define: {
            'process.env.VITE_SER': JSON.stringify(process.env.VITE_SER),
        },  server: {
            host: '0.0.0.0', // Allow connections from other devices
            open:true,

        },  
    })}
