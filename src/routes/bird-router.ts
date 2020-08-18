import * as express from "express";
import Bird from "../models/Bird";
import { v4 as uuid } from "uuid";
import cors from "cors";

export class BirdRouter {
  constructor(server: express.Express) {
    const router = express.Router();

    const birds: any = new Map<string, Bird>();
    birds[uuid()] = {
      genus: "feline",
      name: "Cosmo",
      isHungry: true,
      lastFedDate: new Date(),
    };
    birds[uuid()] = {
      genus: "feline",
      name: "Emmy",
      isHungry: true,
      lastFedDate: new Date(),
    };

    /**
     * @swagger
     * /:
     *  get:
     *    description: Use to request all birds
     *    responses:
     *      '200':
     *        description: A successful response
     */
    router.get("/", (req: express.Request, res: express.Response) => {
      res.json({
        message: `Nothing to see here, [url]/birds instead.`,
      });
    });

    //get all birds
    /**
     * @swagger
     * /:
     *  get:
     *    description: Use to request all birds
     *    responses:
     *      '200':
     *        description: A successful response
     */
    router.get(
      "/birds",
      cors(),
      (req: express.Request, res: express.Response) => {
        res.json({
          birds,
        });
      }
    );

    //create new cat
    router.post(
      "/birds",
      cors(),
      (req: express.Request, res: express.Response) => {
        try {
          let cat: Bird = {} as Bird;
          Object.assign(cat, req.body);
          const newUUID = uuid();
          birds[newUUID] = cat;
          res.json({
            uuid: newUUID,
          });
        } catch (e) {
          res
            .status(400)
            .send(JSON.stringify({ error: "problem with posted data" }));
        }
      }
    );

    //get cat by id
    router.get(
      "/birds/:id",
      cors(),
      (req: express.Request, res: express.Response) => {
        res.json({
          cat: req.params.id,
        });
        if (!!birds[req.params.id]) {
          res.json({
            cat: birds[req.params.id],
          });
        } else {
          res.status(404).send(JSON.stringify({ error: "no such cat" }));
        }
      }
    );

    //update cat
    router.put(
      "/birds/:id",
      cors(),
      (req: express.Request, res: express.Response) => {
        try {
          if (!!birds[req.params.id]) {
            let cat: Bird = {} as Bird;
            Object.assign(cat, req.body);
            birds[req.params.id] = cat;
            res.json({
              cat: birds[req.params.id],
            });
          } else {
            res.status(404).send(JSON.stringify({ error: "no such cat" }));
          }
        } catch (e) {
          res
            .status(400)
            .send(JSON.stringify({ error: "problem with posted data" }));
        }
      }
    );

    //delete cat
    router.delete(
      "/birds/:id",
      cors(),
      (req: express.Request, res: express.Response) => {
        if (!!birds[req.params.id]) {
          delete birds[req.params.id];
          res.json({
            uuid: req.params.id,
          });
        } else {
          res.status(404).send(JSON.stringify({ error: "no such cat" }));
        }
      }
    );

    router.options("*", cors());

    server.use("/", router);
  }
}
