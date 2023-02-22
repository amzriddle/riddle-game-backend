import { Test, TestingModule } from "@nestjs/testing";
import { RiddleController } from "./riddle.controller";
import { RiddleService } from "./riddle.service";

describe("RiddleController", () => {
  let controller: RiddleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RiddleController],
      providers: [RiddleService],
    }).compile();

    controller = module.get<RiddleController>(RiddleController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
