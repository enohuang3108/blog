export const siteConfig = {
  author: "Eno Huang",
  title: "Vitesse theme for Astro",
  subtitle: "Vitesse theme for Astro, supports Vue and UnoCSS.",
  description: "A Minimal, SEO-friendly portfolio and blog theme for Astro.",
  image: {
    src: "/favicon.png",
    alt: "Website Main Image",
  },
  email: "enohuang3108@gmail.com",
  socialLinks: [
    {
      text: "GitHub",
      href: "https://github.com/enohuang3108/",
      icon: "mingcute:github-line",
    },
    {
      text: "Linkedin",
      href: "",
      icon: "tabler:brand-linkedin",
    },
  ],
  header: {
    logo: {
      src: "/favicon.png",
      alt: "Logo Image",
    },
    navLinks: [
      {
        text: "Blog",
        href: "/blog",
      },
    ],
  },
  page: {
    blogLinks: [
      {
        text: "Blog",
        href: "/blog",
      },
    ],
  },
};

export default siteConfig;
