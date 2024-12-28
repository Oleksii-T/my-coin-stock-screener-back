exports.loginForm = (req, res) => {
  res.locals.layout = "layouts/admin-auth";
  res.locals.title = "Login";

  res.render("admin/auth/login");
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  // Add your web authentication logic here
  if (username === "admin" && password === "password") {
    res.send("Login successful");
  } else {
    res.status(401).send("Invalid credentials");
  }
};
