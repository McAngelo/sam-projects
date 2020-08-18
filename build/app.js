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
var express_1 = __importDefault(require("express"));
var index_1 = require("./routes/index");
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var swaggerDocument = __importStar(require("./swagger.json"));
var bodyParser = __importStar(require("body-parser"));
//Extended https://swagger.io/specification/#infoObject
var swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Sam Project API",
            description: "These are a couple of APIs from the Sam-Project",
            version: "1.0.0",
            termsOfService: "",
            contact: {
                name: "Michael Kwame Johnson",
                email: "mcangelo200@gmail.com",
                url: 'http://www.codafric.com'
            },
        },
        servers: ["http://localhost:3000"]
    },
    //['./routes/*.js]
    apis: ["./router.ts"],
};
var swaggerDocs = swagger_jsdoc_1.default(swaggerOptions);
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.Start = function (port) {
            return new Promise(function (resolve, reject) {
                _this.httpServer
                    .listen(port, function () {
                    resolve(port);
                })
                    .on("error", function (err) { return reject(err); });
            });
        };
        this.httpServer = express_1.default();
        this.httpServer.use(bodyParser.urlencoded({ extended: true }));
        this.httpServer.use(bodyParser.json());
        new index_1.CatRouter(this.httpServer);
        this.httpServer.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
        this.httpServer.use("/swagger", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
    }
    return App;
}());
exports.default = App;
