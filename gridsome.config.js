module.exports = {
  siteName: "Stephen Dolan",
  siteDescription: "A simple blog designed with Gridsome",
  plugins: [
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "content/posts/**/*.md",
        typeName: "Post",
        route: "/blog/:slug",
      },
    },
    {
      use: "gridsome-plugin-gtm",
      options: {
        id: "GTM-TS6HDHW",
        enabled: true,
        debug: true,
      },
    },
  ],
  transformers: {
    remark: {
      autolinkHeadings: false,
      externalLinksTarget: "_blank",
      externalLinksRel: ["nofollow", "noopener", "noreferrer"],
      plugins: ["@gridsome/remark-prismjs"],
    },
  },
};
