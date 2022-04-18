import { AllureStep, StepInterface } from "../../node_modules/allure-js-commons";
import { AllureReporter } from "./AllureReporter";
export declare class StepWrapper {
    private readonly reporter;
    private readonly step;
    constructor(reporter: AllureReporter, step: AllureStep);
    startStep(name: string): StepWrapper;
    endStep(): void;
    run<T>(body: (step: StepInterface) => T): T;
}
