import { suite, test } from "@testdeck/mocha";
import { Status } from "../../../node_modules/allure-js-commons";
import { expect } from "chai";
import { findLabelValue, runTests } from "../utils";

@suite
class TagSuite {
  @test
  async shouldHaveTags() {
    const writerStub = await runTests("tag");
    const test = writerStub.getTestByName("shouldAssignTag");

    expect(test.status).eq(Status.PASSED);
    expect(findLabelValue(test, "tag")).eq("smoke");
  }
}
