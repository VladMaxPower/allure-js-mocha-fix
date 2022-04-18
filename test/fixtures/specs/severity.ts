import { suite, test } from "@testdeck/mocha";
import { Severity } from "../../../../node_modules/allure-js-commons";
import { allure } from "../../../runtime";

@suite
class SeveritySubSuite {
  @test
  shouldAssignSeverity() {
    allure.severity(Severity.BLOCKER);
  }
}
