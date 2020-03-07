var express = require("express");
var path = require("path")
var fs = require("fs")
var PORT = process.env.PORT || 8080;
var app = express();

// Sets up the Express app to handle data parsing
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// $saveNoteBtn.on("click", function(event) {
//   event.preventDefault();
//   var newNote = {
//     title: $noteTitle.val(),
//     text: $noteText.val(),
//     // id: $("#age").val(),
//   };

//   // Question: What does this code do??
//   $.post("/api/notes", newNote)
//     .then(function(data) {
//       console.log("notes.html", data);
//       alert("Adding note...");
//     });
// });

// app.get("/", function(req, res) {
//   res.sendFile(path.join(__dirname, "./public/index.html"))
// })

// app.route("/notes").get(function(req, res) {
//   res.sendFile(path.join(__dirname, "./public/index.html"))
// })

// app.route("/api/notes").get(function(req, res) {
//   var notes;
//   readDb(notes);
//   res.json(notes);
// })


// require("/public/assets/js/index")(app);
// // require("./routes/htmlRoutes")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
  

  var notes = [];
  
  // Routes
  // =============================================================
  
  // Basic route that sends the user first to the AJAX Page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });
  
  app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
  });
  
  // Displays all notes
  app.get("/api/notes", function(req, res) {
    return res.json(notes);
  });
  
  // Displays a single note, or returns false
  app.get("/api/notes/:id", function(req, res) {
    var chosen = req.params.note;
  
    console.log(chosen);
  
    for (var i = 0; i < notes.length; i++) {
      if (chosen === notes[i].routeName) {
        return res.json(notes[i]);
      }
    }
  
    return res.json(false);
  });
  
  // Create New notes - takes in JSON input
  app.post("/api/notes", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newnote = req.body;
  
    // Using a RegEx Pattern to remove spaces from newnote
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newnote.routeName = newnote.name.replace(/\s+/g, "");
  
    console.log(newnote);
  
    notes.push(newnote);
  
    res.json(newnote);
  });
  
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  