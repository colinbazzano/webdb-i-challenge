const express = require("express");

const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", (req, res) => {});

router.post("/", validateAccount, (req, res) => {});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

function validateAccountId(req, res, next) {
  const id = req.params.id;
  db.get(id)
    .then(id => {
      id
        ? (req.project = id && next())
        : res.status(400).json({ message: "Account ID does not exist. " });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Unable to validate ID." });
    });
}

function validateAccount(req, res, next) {
  const accountData = req.body;
  if (!accountData.name || !accountData.budget) {
    res.status(400).json({ message: "Please provide a name and a budget. " });
  } else {
    next();
  }
}
