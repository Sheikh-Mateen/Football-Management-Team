require("dotenv").config();
const express = require("express");
const csvtojson = require('csvtojson');
const app = express();
const { connectToDatabase, footBall } = require("./config");

const importData = async () => {
  try {
    const jsonArray = await csvtojson().fromFile("FootbalCSV.csv");
    const docs = await footBall.insertMany(jsonArray);
    console.log('Data saved to MongoDB');
  } catch (error) {
    console.log(error.message);
  }
};
connectToDatabase().then(async (res) => {
  await importData();
})
