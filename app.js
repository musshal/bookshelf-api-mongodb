import Hapi from "@hapi/hapi";
import mongoose from "mongoose";
import routes from "./src/routes.js";

const init = async () => {
  const server = Hapi.server({
    host: 'localhost',
    port: 5000,
  });

  mongoose.set('strictQuery', false);
  mongoose.connect('mongodb://localhost/bookshelf-app');

  server.route(routes);

  await server.start();

  console.log('server running on ' + server.info.uri);
}

init();