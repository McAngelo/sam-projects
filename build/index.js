"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var port = parseInt(process.env.PORT || '3000');
var server = new app_1.default().Start(port)
    .then(function (port) { return console.log("Server running on port " + port); })
    .catch(function (error) {
    console.log(error);
    process.exit(1);
});
exports.default = server;
