module.exports = {
  siteName: "Stephen Dolan",
  siteDescription: "A simple blog designed with Gridsome",
  plugins: [
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "content/posts/**/*.md",
        typeName: "Post",
        route: "/blog/:slug"
      }
    }
  ],
  transformers: {
    remark: {
      plugins: ["@gridsome/remark-prismjs"]
    }
  }
};
