// Files from earlier versions of this site that may still sit in the repo.
// GitHub's web uploader never deletes, so the build skips them explicitly.
const RETIRED = [
  "01-multi-firm",
  "02-ford-search",
  "03-brand-systems-old",
];

module.exports = function (c) {
  c.addPassthroughCopy({ "src/admin/index.html": "admin/index.html" });
  c.addPassthroughCopy("src/images");

  const byOrder = (a, b) => (a.data.order || 99) - (b.data.order || 99);
  const live = (col) => col.filter((i) => !RETIRED.includes(i.fileSlug));

  // belt and braces: if two entries share a title, keep the first
  const unique = (col) => {
    const seen = new Set();
    return col.filter((i) => {
      const k = (i.data.title || "").trim().toLowerCase();
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  };

  c.addCollection("projects", (col) =>
    unique(live(col.getFilteredByGlob("src/projects/*.md")).sort(byOrder)));
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
