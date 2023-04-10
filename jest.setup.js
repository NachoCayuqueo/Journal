import "whatwg-fetch";
import "setimmediate"; //cloudinarys

//configuracion para poder realizar testing en .env
require("dotenv").config({
  path: ".env.test",
});

jest.mock("./src/helpers/getEnvironments", () => ({
  getEnvironments: () => ({ ...process.env }),
}));
