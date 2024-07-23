import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NextCondo",
    short_name: "NextCondo",
    description: "Simple property management app",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        sizes: "192x192",
        src: "/favicon.ico",
      },
      {
        src: "/favicon.ico",
        sizes: "512x512",
      },
    ],
    prefer_related_applications: false,
  };
}
