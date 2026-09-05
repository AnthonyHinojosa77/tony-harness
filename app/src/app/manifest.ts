import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Work Park",
    short_name: "Work Park",
    description: "Anthony's personal AI workspace. Every model, your rules.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f1e6",
    theme_color: "#f6f1e6",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
