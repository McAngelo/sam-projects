import express from "express";
import { CatRouter } from "./routes/index";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import * as swaggerDocument from "./swagger.json";
import * as bodyParser from "body-parser";

//Extended https://swagger.io/specification/#infoObject
const swaggerOptions: any = {
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
        url: "http://www.codafric.com",
      },
      license: {
        name: "Apache 2.0",
        url: "https://www.apache.org/licenses/LICENSE-2.0.html",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Local server",
      },
      {
        url: "https://samp-project.herokuapp.com/api/v1",
        description: "DEV Env",
      },
      {
        url: "https://app-uat.herokuapp.com/api/v1",
        description: "UAT Env",
      },
    ],
  },
  //['./routes/*.js]
  apis: ["./routes"],
};

const swaggerDocs:any = swaggerJsDoc(swaggerOptions);

class App {
  private httpServer: any;

  constructor() {
    this.httpServer = express();

    this.httpServer.use(bodyParser.urlencoded({ extended: true }));
    this.httpServer.use(bodyParser.json());

    new CatRouter(this.httpServer);

    this.httpServer.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocs)
    );

    this.httpServer.use(
      "/swagger",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }

  public Start = (port: number) => {
    return new Promise((resolve, reject) => {
      this.httpServer
        .listen(port, () => {
          resolve(port);
        })
        .on("error", (err: object) => reject(err));
    });
  };
}

export default App;
