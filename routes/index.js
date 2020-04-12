const path = require("path");
const router = require("express").Router();
import apiRoutes from "./api";

export default function(app) {
    apiRoutes(app);

};