var express = require("express");
var PORT = process.env.PORT || 8080;
var app = express();

// Sets up the Express app to handle data parsing
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// require("/public/assets/js/index")(app);
// // require("./routes/htmlRoutes")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
  