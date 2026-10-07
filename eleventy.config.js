module.exports = function (c) {
  c.addPassthroughCopy({ "src/admin/index.html": "admin/index.html" });
  c.addPassthroughCopy("src/images");

  const byOrder = (a, b) => (a.data.order || 99) - (b.data.order || 99);

  c.addCollection("projects", (col) =>
    col.getFilteredByGlob("src/projects/*.md").sort(byOrder));
  c.addCollection("roles", (col) =>
    col.getFilteredByGlob("src/roles/*.md").sort(byOrder));
  c.addCollection("method", (col) =>
    col.getFilteredByGlob("src/method/*.md").sort(byOrder));

  c.addFilter("pad", (n) => String(n).padStart(2, "0"));

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
