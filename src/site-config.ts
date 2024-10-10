export const siteConfig = {
  author: "Eno Huang",
  title: "Eno's Blog",
  subtitle: "Knowledge increases by sharing but not by saving.",
  description:
    "Knowledge increases by sharing but not by saving. 這是一個在新竹的軟體工程師，分享技術心得的角落。",
  image: {
    src: "/favicon.webp",
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
      href: "https://www.linkedin.com/in/enohuang",
      icon: "tabler:brand-linkedin",
    },
  ],
  header: {
    logo: {
      src: "/favicon.webp",
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
  skills: [
    // Frontend
    "typescript",
    "javascript",
    "react",
    "html5",
    "css3",
    "threedotjs",
    // Backend
    "nodedotjs",
    // Cloud Services
    "amazonaws",
    "vercel",
    "cloudflare",
    // Testing
    "testinglibrary",
    "vitest",
    // Development Tools
    "docker",
    "git",
    "vite",
    // CSS Framework
    "tailwindcss",
    // Web Framework
    "astro",
    // Data Fetching
    "reactquery",
  ],
};

export default siteConfig;
