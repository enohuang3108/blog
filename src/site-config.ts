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
      {
        text: "Slides",
        href: "/slides",
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
  slides: [
    {
      title: "字型設置與優化",
      description: "介紹字型設置、格式選擇、壓縮優化與瀏覽器加載機制",
      date: "2025-08-01",
      url: "https://enohuang3108.github.io/slides/2025/font-settings-and-optimization/",
      tags: ["Frontend", "Font"],
    },
  ],
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
    "python",
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
