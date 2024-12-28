exports.index = (req, res) => {
  res.locals.layout = "layouts/landing";
  res.locals.title = "Express";

  res.render("landing/index");
};

exports.terms = (req, res) => {
  res.locals.layout = "layouts/landing";
  res.locals.title = "Landing";

  res.render("landing/terms");
};

exports.privacy = (req, res) => {
  res.locals.layout = "layouts/landing";
  res.locals.title = "Pravicy Policy";

  res.render("landing/privacy");
};

exports.aboutUs = (req, res) => {
  res.locals.layout = "layouts/landing";
  res.locals.title = "About Us";

  res.render("landing/about-us");
};

exports.contactUs = (req, res) => {
  res.locals.layout = "layouts/landing";
  res.locals.title = "Contact Us";

  res.render("landing/contact-us");
};
