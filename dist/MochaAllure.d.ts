/// <reference types="node" />
import { Allure, AllureRuntime, AllureTest, AttachmentOptions, ContentType, ExecutableItemWrapper, Status, StepInterface } from "../../node_modules/allure-js-commons";
import { AllureReporter } from "./AllureReporter";
export declare class MochaAllure extends Allure {
    private readonly reporter;
    constructor(reporter: AllureReporter, runtime: AllureRuntime);
    protected get currentExecutable(): ExecutableItemWrapper;
    protected set currentExecutable(executable: ExecutableItemWrapper);
    step<T>(name: string, body: (step: StepInterface) => any): any;
    logStep(name: string, status?: Status): void;
    attachment(name: string, content: Buffer | string, options: ContentType | string | AttachmentOptions): void;
    testAttachment(name: string, content: Buffer | string, options: ContentType | string | AttachmentOptions): void;
    protected get currentTest(): AllureTest;
    private startStep;
}
