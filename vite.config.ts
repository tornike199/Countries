import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const COUNTRIES_FIELDS =
  "names,codes,capitals,flag,region,subregion,population,tlds,currencies,languages,borders";
const COUNTRIES_API_KEY = "rc_live_faafc7326eca4f6db8b97011f9afbc42";

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api/countries": {
          target: "https://api.restcountries.com",
          changeOrigin: true,
          rewrite: () => `/countries/v5?fields=${COUNTRIES_FIELDS}`,
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              proxyReq.setHeader("Authorization", `Bearer ${COUNTRIES_API_KEY}`);
            });
          },
        },
      },
    },
  };
});
