// vite.config.ts
import react from "file:///V:/less/palax/monitoring/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///V:/less/palax/monitoring/node_modules/vite/dist/node/index.js";
import { ViteAliases } from "file:///V:/less/palax/monitoring/node_modules/vite-aliases/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    ViteAliases({
      dir: "src",
      prefix: "@",
      deep: false,
      depth: 0,
      adjustDuplicates: false
    })
  ],
  define: {
    "process.env": {}
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJWOlxcXFxsZXNzXFxcXHBhbGF4XFxcXG1vbml0b3JpbmdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIlY6XFxcXGxlc3NcXFxccGFsYXhcXFxcbW9uaXRvcmluZ1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVjovbGVzcy9wYWxheC9tb25pdG9yaW5nL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB7IFZpdGVBbGlhc2VzIH0gZnJvbSAndml0ZS1hbGlhc2VzJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAgIHBsdWdpbnM6IFtcbiAgICAgICAgcmVhY3QoKSxcbiAgICAgICAgVml0ZUFsaWFzZXMoe1xuICAgICAgICAgICAgZGlyOiAnc3JjJyxcbiAgICAgICAgICAgIHByZWZpeDogJ0AnLFxuICAgICAgICAgICAgZGVlcDogZmFsc2UsXG4gICAgICAgICAgICBkZXB0aDogMCxcbiAgICAgICAgICAgIGFkanVzdER1cGxpY2F0ZXM6IGZhbHNlLFxuICAgICAgICB9KSxcbiAgICBdLFxuICAgIGRlZmluZToge1xuICAgICAgICAncHJvY2Vzcy5lbnYnOiB7fSxcbiAgICB9LFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBa1EsT0FBTyxXQUFXO0FBQ3BSLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsbUJBQW1CO0FBRTVCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVM7QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxNQUNSLEtBQUs7QUFBQSxNQUNMLFFBQVE7QUFBQSxNQUNSLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxNQUNQLGtCQUFrQjtBQUFBLElBQ3RCLENBQUM7QUFBQSxFQUNMO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDSixlQUFlLENBQUM7QUFBQSxFQUNwQjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
