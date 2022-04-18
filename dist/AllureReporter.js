"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllureReporter = void 0;
const crypto_1 = require("crypto");
const allure_js_commons_2 = require("allure-js-commons");
const MochaAllure_1 = require("./MochaAllure");
class AllureReporter {
    constructor(allureRuntime) {
        this.allureRuntime = allureRuntime;
        this.currentExecutable = null;
        this.suites = [];
        this.steps = [];
        this.runningTest = null;
    }
    getImplementation() {
        return new MochaAllure_1.MochaAllure(this, this.allureRuntime);
    }
    get currentSuite() {
        return this.suites.length > 0 ? this.suites[this.suites.length - 1] : null;
    }
    get currentStep() {
        return this.steps.length > 0 ? this.steps[this.steps.length - 1] : null;
    }
    get currentTest() {
        return this.runningTest;
    }
    set currentTest(test) {
        this.runningTest = test;
    }
    startSuite(suiteName) {
        const scope = this.currentSuite || this.allureRuntime;
        const suite = scope.startGroup(suiteName || "Global");
        this.pushSuite(suite);
    }
    endSuite() {
        if (this.currentSuite !== null) {
            if (this.currentStep !== null) {
                this.currentStep.endStep();
            }
            this.currentSuite.endGroup();
            this.popSuite();
        }
    }
    startHook(hook) {
        const suite = this.currentSuite;
        const title = hook.title;
        if (suite && title && title.includes("before")) {
            this.currentExecutable = suite.addBefore();
        }
        else if (suite && title && title.includes("after")) {
            this.currentExecutable = suite.addAfter();
        }
        if (this.currentExecutable) {
            this.currentExecutable.name = hook.originalTitle || hook.title;
        }
    }
    endHook(error) {
        if (this.currentExecutable) {
            this.currentExecutable.stage = allure_js_commons_2.Stage.FINISHED;
            if (error) {
                this.currentExecutable.status = allure_js_commons_2.Status.FAILED;
                this.currentExecutable.statusDetails = { message: error.message, trace: error.stack };
            }
            else {
                this.currentExecutable.status = allure_js_commons_2.Status.PASSED;
            }
        }
    }
    startCase(test) {
        if (this.currentSuite === null) {
            throw new Error("No active suite");
        }
        this.currentTest = this.currentSuite.startTest(test.title);
        this.currentTest.fullName = test.title;
        this.currentTest.historyId = (0, crypto_1.createHash)("md5").update(test.fullTitle()).digest("hex");
        this.currentTest.stage = allure_js_commons_2.Stage.RUNNING;
        if (test.parent) {
            const parentSuite = test.parent.fullTitle();
            if (parentSuite) {
                this.currentTest.addLabel("parentSuite", parentSuite);
            }
        }
    }
    passTestCase(test) {
        if (this.currentTest === null) {
            this.startCase(test);
        }
        this.endTest(allure_js_commons_2.Status.PASSED);
    }
    pendingTestCase(test) {
        this.startCase(test);
        this.endTest(allure_js_commons_2.Status.SKIPPED, { message: "Test ignored" });
    }
    failTestCase(test, error) {
        if (this.currentTest === null) {
            this.startCase(test);
        }
        else {
            const latestStatus = this.currentTest.status;
            if (latestStatus === allure_js_commons_2.Status.FAILED || latestStatus === allure_js_commons_2.Status.BROKEN) {
                return;
            }
        }
        const status = error.name === "AssertionError" ? allure_js_commons_2.Status.FAILED : allure_js_commons_2.Status.BROKEN;
        this.endTest(status, { message: error.message, trace: error.stack });
    }
    writeAttachment(content, options) {
        return this.allureRuntime.writeAttachment(content, options);
    }
    pushStep(step) {
        this.steps.push(step);
    }
    popStep() {
        this.steps.pop();
    }
    pushSuite(suite) {
        this.suites.push(suite);
    }
    popSuite() {
        this.suites.pop();
    }
    endTest(status, details) {
        if (this.currentTest === null) {
            throw new Error("endTest while no test is running");
        }
        if (details) {
            this.currentTest.statusDetails = details;
        }
        this.currentTest.status = status;
        this.currentTest.stage = allure_js_commons_2.Stage.FINISHED;
        this.currentTest.endTest();
        this.currentTest = null;
    }
}
exports.AllureReporter = AllureReporter;
//# sourceMappingURL=AllureReporter.js.map
