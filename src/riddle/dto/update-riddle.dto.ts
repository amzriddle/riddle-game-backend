import { PartialType } from "@nestjs/mapped-types";
import { CreateRiddleDto } from "./create-riddle.dto";

export class UpdateRiddleDto extends PartialType(CreateRiddleDto) {}
