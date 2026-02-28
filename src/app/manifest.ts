import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "New York Journal American",
    short_name: "NYJA",
    description: "An American Paper for the American People",
    start_url: "/",
    display: "standalone",
    background_color: "#16223b",
    theme_color: "#16223b",
    icons: [
      {
        src: "/avatar192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/avatar512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
