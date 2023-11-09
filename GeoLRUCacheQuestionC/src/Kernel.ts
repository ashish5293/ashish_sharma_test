import { Container } from "inversify";
import "reflect-metadata";
import { CacheController } from "./controllers/CacheController";
import { LRUCache } from "./LRUCache";
import { TYPES } from "./types"

if (!process.env.npm_package_name || !process.env.npm_package_version) {
    /* eslint camelcase: 0 */
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
    const p = require("../../package.json");
    process.env.npm_package_name = p.name;
    process.env.npm_package_version = p.version;
}


const kernel = new Container();

const MAX_SIZE = 1000;
const cache = new LRUCache<any>(MAX_SIZE)

kernel
    .bind<LRUCache<any>>(TYPES.LRUCache)
    .toConstantValue(cache)
    .whenTargetNamed(TYPES.LRUCache);


//bind controllers
kernel
    .bind<CacheController>(TYPES.Controller)
    .to(CacheController)
    .whenTargetNamed(TYPES.CacheController);


export { kernel, TYPES };
