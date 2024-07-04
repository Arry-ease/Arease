exports.errorPage = (_req, res, _next) => {
  res.status(404).render("404", { pageTitle: "404page", path: "/404" });
};
