import { Container } from "inversify";
import "reflect-metadata";
import { CompareVersionsController } from "./controllers/CompareVersionsController";
import { OverlappingLinesXAxisController } from "./controllers/OverlappingLinesXAxisController";
import { TYPE } from "inversify-restify-utils";

if (!process.env.npm_package_name || !process.env.npm_package_version) {
    /* eslint camelcase: 0 */
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
    const p = require("../package.json");
    process.env.npm_package_name = p.name;
    process.env.npm_package_version = p.version;
}

const TYPES = {
    Controller: TYPE.Controller,
    CompareVersionsController: "CompareVersionsController",
    OverlappingLinesXAxisController: "OverlappingLinesXAxisController",
};

const kernel = new Container();

//bind controllers
kernel
    .bind<CompareVersionsController>(TYPES.Controller)
    .to(CompareVersionsController)
    .whenTargetNamed(TYPES.CompareVersionsController);
kernel
    .bind<OverlappingLinesXAxisController>(TYPES.Controller)
    .to(OverlappingLinesXAxisController)
    .whenTargetNamed(TYPES.OverlappingLinesXAxisController);

export { kernel, TYPES };
