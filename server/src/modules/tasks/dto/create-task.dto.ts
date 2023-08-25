import {
  IsInt,
  Min,
  IsString,
  IsNotEmpty,
  MinLength,
  IsOptional,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MinLength(1)
  @IsOptional()
  note?: string;

  @IsInt()
  @Min(0)
  actPomodoro: number;

  @IsInt()
  @Min(0)
  estPomodoro: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  title: string;
}
