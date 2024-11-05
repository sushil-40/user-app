import express from "express";
const app = express();

const PORT = 8000;

// app.get("/", (req, res) => {
//   //   console.log(req);

//   console.log("we got the request");
//   res.send(
//     "<h1>Hello server dev</h1><hr/><p>lorem ipsum sfdksaflsafjdsajf    safsalfsalfjsa;fs    sfdsdflskfdl;sfdksaflsafjdsajf</p>"
//   );
// });

import path from "path";

const __dirname = path.resolve();
console.log(__dirname, "====");

// serve static file from the public directory

app.use(express.static(path.join(__dirname, "public")));

// home page controller

app.get("/", (req, res) => {
  console.log("req received");
  res.sendFile(__dirname + "/src/html/index.html");
});

// user registration controller
app.get("/registration", (req, res) => {
  console.log("req received registration");
  res.sendFile(__dirname + "/src/html/register.html");
});

// user login controller
app.get("/login", (req, res) => {
  console.log("req received login");
  res.sendFile(__dirname + "/src/html/login.html");
});

// app.get("/get-user", (req, res) => {
//   res.json({
//     fName: "Susil",
//     lName: "Dangoriya",
//   });
// });
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server is running at http://localhost:${PORT}`);
});
