"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var uuid_1 = require("uuid");
var cors_1 = __importDefault(require("cors"));
var Router = /** @class */ (function () {
    function Router(server) {
        var router = express.Router();
        var cats = new Map();
        cats[uuid_1.v4()] = {
            genus: "feline",
            name: "Cosmo",
            isHungry: true,
            lastFedDate: new Date(),
        };
        cats[uuid_1.v4()] = {
            genus: "feline",
            name: "Emmy",
            isHungry: true,
            lastFedDate: new Date(),
        };
        router.get("/", function (req, res) {
            res.json({
                message: "Nothing to see here, [url]/cats instead.",
            });
        });
        //get all cats
        router.get("/cats", cors_1.default(), function (req, res) {
            res.json({
                cats: cats,
            });
        });
        //create new cat
        router.post("/cats", cors_1.default(), function (req, res) {
            try {
                var cat = {};
                Object.assign(cat, req.body);
                var newUUID = uuid_1.v4();
                //cats[newUUID] = cat;
                res.json({
                    uuid: newUUID,
                });
            }
            catch (e) {
                res
                    .status(400)
                    .send(JSON.stringify({ error: "problem with posted data" }));
            }
        });
        //get cat by id
        router.get("/cats/:id", cors_1.default(), function (req, res) {
            res.json({
                cat: req.params.id,
            });
            if (!!cats[req.params.id]) {
                res.json({
                    cat: cats[req.params.id],
                });
            }
            else {
                res.status(404).send(JSON.stringify({ error: "no such cat" }));
            }
        });
        //update cat
        router.put("/cats/:id", cors_1.default(), function (req, res) {
            try {
                if (!!cats[req.params.id]) {
                    var cat = {};
                    Object.assign(cat, req.body);
                    cats[req.params.id] = cat;
                    res.json({
                        cat: cats[req.params.id],
                    });
                }
                else {
                    res.status(404).send(JSON.stringify({ error: "no such cat" }));
                }
            }
            catch (e) {
                res
                    .status(400)
                    .send(JSON.stringify({ error: "problem with posted data" }));
            }
        });
        //delete cat
        router.delete("/cats/:id", cors_1.default(), function (req, res) {
            if (!!cats[req.params.id]) {
                delete cats[req.params.id];
                res.json({
                    uuid: req.params.id,
                });
            }
            else {
                res.status(404).send(JSON.stringify({ error: "no such cat" }));
            }
        });
        router.options("*", cors_1.default());
        server.use("/", router);
    }
    return Router;
}());
exports.default = Router;
