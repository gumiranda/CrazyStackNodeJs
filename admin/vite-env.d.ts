/// <reference types="vite/client" />

declare module "@tailwindcss/vite" {
  import type { Plugin } from "vite";
  export default function tailwindcss(): Plugin;
}
