import { suite, test } from "@testdeck/mocha";
import { ContentType } from "../../../../node_modules/allure-js-commons";
import { allure } from "../../../runtime";

@suite
class DecoratedHooks {
  @test
  shouldAddAfterHookAttachment() {}

  public after() {
    allure.attachment("test attachment 1", "test attachment 1 content", ContentType.TEXT);
  }
}
