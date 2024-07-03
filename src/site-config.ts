export const siteConfig = {
  author: "Kevin Wong",
  title: "Vitesse theme for Astro",
  subtitle: "Vitesse theme for Astro, supports Vue and UnoCSS.",
  description: "A Minimal, SEO-friendly portfolio and blog theme for Astro.",
  image: {
    src: "/hero.jpg",
    alt: "Website Main Image",
  },
  email: "kevinwong865@gmail.com",
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
