// Netlify sets REPOSITORY_URL during every build, e.g.
//   https://github.com/yeshapraj/portfolio
// So the CMS config can work out the repo itself and nobody has to type it.
module.exports = function () {
  const url = process.env.REPOSITORY_URL || "";
  const branch = process.env.BRANCH || "main";

  let slug = "";
  const m = url.match(/github\.com[/:]([^/]+\/[^/.]+)/i);
  if (m) slug = m[1];

  return { slug, branch, detected: Boolean(slug) };
};
