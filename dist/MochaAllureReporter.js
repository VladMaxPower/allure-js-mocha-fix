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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MochaAllureReporter = exports.allure = void 0;
const allure_js_commons_1 = require("allure-js-commons");
const Mocha = __importStar(require("mocha"));
const AllureReporter_1 = require("./AllureReporter");
class MochaAllureReporter extends Mocha.reporters.Base {
    constructor(runner, opts) {
        super(runner, opts);
        this.runner = runner;
        this.opts = opts;
        const { resultsDir } = opts.reporterOptions;
        const allureConfig = Object.assign({ resultsDir: resultsDir || "allure-results" }, opts.reporterOptions);
        this.coreReporter = new AllureReporter_1.AllureReporter(new allure_js_commons_1.AllureRuntime(allureConfig));
        exports.allure = this.coreReporter.getImplementation();
        this.runner
            .on("suite", this.onSuite.bind(this))
            .on("suite end", this.onSuiteEnd.bind(this))
            .on("test", this.onTest.bind(this))
            .on("pass", this.onPassed.bind(this))
            .on("fail", this.onFailed.bind(this))
            .on("pending", this.onPending.bind(this))
            .on("hook", this.onHookStart.bind(this))
            .on("hook end", this.onHookEnd.bind(this));
    }
    onSuite(suite) {
        this.coreReporter.startSuite(suite.fullTitle());
    }
    onSuiteEnd() {
        this.coreReporter.endSuite();
    }
    onTest(test) {
        this.coreReporter.startCase(test);
    }
    onPassed(test) {
        this.coreReporter.passTestCase(test);
    }
    onFailed(test, error) {
        this.coreReporter.failTestCase(test, error);
    }
    onPending(test) {
        this.coreReporter.pendingTestCase(test);
    }
    onHookStart(hook) {
        this.coreReporter.startHook(hook);
    }
    onHookEnd(hook) {
        this.coreReporter.endHook(hook.error());
    }
}
exports.MochaAllureReporter = MochaAllureReporter;
//# sourceMappingURL=MochaAllureReporter.js.map