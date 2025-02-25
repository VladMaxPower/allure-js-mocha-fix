import { suite, test } from "@testdeck/mocha";
import { Status } from "../../../node_modules/allure-js-commons";
import { expect } from "chai";
import { findLabelValue, runTests } from "../utils";

@suite
class FeatureSuite {
  @test
  async shouldHaveFeature() {
    const writerStub = await runTests("feature");
    const test = writerStub.getTestByName("shouldAssignFeature");

    expect(test.status).eq(Status.PASSED);
    expect(findLabelValue(test, "feature")).eq("Login");
  }
}
