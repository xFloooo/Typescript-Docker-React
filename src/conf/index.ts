import * as nconf from "nconf";
// import * as path from "path";
// import * as fs from "fs";

// var confFile = path.join(__dirname, "../../config/config.json");
// var confFileLocal = path.join(__dirname, "../../config/config_local.json");

// if (fs.existsSync(confFileLocal)) {
//     nconf.overrides(JSON.parse(fs.readFileSync(confFileLocal, "utf8")));
// }
// nconf.env().file({ file: confFile });
nconf.env();
export const AppConf = nconf;
