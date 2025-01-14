/// <reference types="node" />
import { AllureGroup, AllureRuntime, AllureStep, AllureTest, AttachmentOptions, ContentType, ExecutableItemWrapper } from "../../node_modules/allure-js-commons";
import { MochaAllure } from "./MochaAllure";
export declare class AllureReporter {
    private readonly allureRuntime;
    currentExecutable: ExecutableItemWrapper | null;
    private suites;
    private steps;
    private runningTest;
    constructor(allureRuntime: AllureRuntime);
    getImplementation(): MochaAllure;
    get currentSuite(): AllureGroup | null;
    get currentStep(): AllureStep | null;
    get currentTest(): AllureTest | null;
    set currentTest(test: AllureTest | null);
    startSuite(suiteName: string): void;
    endSuite(): void;
    startHook(hook: Mocha.Hook): void;
    endHook(error?: Error): void;
    startCase(test: Mocha.Test): void;
    passTestCase(test: Mocha.Test): void;
    pendingTestCase(test: Mocha.Test): void;
    failTestCase(test: Mocha.Test, error: Error): void;
    writeAttachment(content: Buffer | string, options: ContentType | string | AttachmentOptions): string;
    pushStep(step: AllureStep): void;
    popStep(): void;
    pushSuite(suite: AllureGroup): void;
    popSuite(): void;
    private endTest;
}
