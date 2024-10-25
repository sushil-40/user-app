import express from "express";
const app = express();

const PORT = 8000;

app.get("/", (req, res) => {
  //   console.log(req);

  console.log("we got the request");
  res.send("from server");
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server is running at http://localhost:${PORT}`);
});
