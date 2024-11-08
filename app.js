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
//importing file system
import fs from "fs";
import { makeHtmlString } from "./src/fileMerger.js";
const __dirname = path.resolve();
console.log(__dirname, "====");

// serve static file from the public directory

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

// home page controller

app.get("/", (req, res) => {
  //reading the text file
  fs.readFile(fileName, "utf8", (error, data) => {
    if (error) {
      console.log(error);
      res.sendFile(__dirname + "/src/html/index.html");
    } else {
      console.log(data.split("\n"));
      res.send(makeHtmlString(data.split("\n")));
    }
  });

  //   console.log("req received");
  //   res.sendFile(__dirname + "/src/html/index.html");
});

// user registration controller
app.get("/registration", (req, res) => {
  console.log("req received registration");
  console.log(req.query);
  res.sendFile(__dirname + "/src/html/register.html");
});

const fileName = "userList.csv";
app.post("/registration", (req, res) => {
  console.log("req received registration");
  const { name, email, password } = req.body;
  // console.log(req.body);
  const str = `${name},${email},${password} \n`;

  // console.log(str.split(","));

  // Create File abd wrute data
  fs.appendFile(fileName, str, (error) => {
    error ? res.send(error.message) : res.redirect("/");
    // : res.send(`<h1 className="alert alert-success">
    //   Data has been writen in the File. You may login now !
    // </h1>`);
    // ? console.log(error)
    // : console.log("Data has been writen in the File.");
  });
  res.sendFile(__dirname + "/src/html/register.html");
});

// user login controller
app.get("/login", (req, res) => {
  console.log("req received login");
  res.sendFile(__dirname + "/src/html/login.html");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const str = email + "," + password;

  //read data from the file
  fs.readFile(fileName, "utf-8", (error, data) => {
    if (error) {
      console.log(error);
      res.send("");
    } else {
      const person = data.split("\n").find((user) => user.includes(str));
      person?.length
        ? res.send(
            `<h1> Hey ${
              person.split(",")[0]
            }, You have successfully logged in.</h1>`
          )
        : res.send(`<h1>Error, Invalid Login Details </h1>`);
    }
  });
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
