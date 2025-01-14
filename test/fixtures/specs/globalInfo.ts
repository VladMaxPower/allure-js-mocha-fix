import { suite, test } from "@testdeck/mocha";
import { Allure, Status } from "../../../../node_modules/allure-js-commons";
import { allure } from "../../../runtime";

@suite
class GlobalInfo {
  @test
  shouldWriteEnvironment() {
    allure.writeEnvironmentInfo({
      Browser: "chrome",
      GitHub: "https://github.com/sskorol",
      Author: "Sergey Korol",
    });
  }

  @test
  shouldWriteCategories() {
    allure.writeCategoriesDefinitions([
      {
        name: "Sad tests",
        messageRegex: /.*Sad.*/,
        matchedStatuses: [Status.FAILED],
      },
      {
        name: "Infrastructure problems",
        messageRegex: ".*Error.*",
        matchedStatuses: [Status.BROKEN],
      },
    ]);
  }
}
