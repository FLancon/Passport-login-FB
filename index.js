const express = require("express");
const app = express();
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./passport");
const isLoggedIn = require("./Middleware/auth");

app.use(
	cookieSession({
		name: "facebook-auth-session",
		keys: ["key1", "key2"],
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/auth/error", (req, res) => res.send("Unknown Error"));
app.get("/auth/facebook", passport.authenticate("facebook"));
app.get(
	"/auth/facebook/callback",
	passport.authenticate("facebook", { failureRedirect: "/login" }),
	function (req, res) {
		res.redirect("/");
	}
);
app.listen(8000, () => {
	console.log("Serve is up and running at the port 8000");
});

app.get("/", isLoggedIn, (req, res) => {
	res.send(`Hello world ${req.user.displayName}`);
	console.log(req.user);
});
app.get("/logout", (req, res) => {
	req.session = null;
	req.logout();
	res.redirect("/");
});
