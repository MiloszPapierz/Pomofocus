import {
  IsInt,
  Min,
  IsString,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class UpdateTaskDto {
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

  @IsBoolean()
  @IsOptional()
  finished?: boolean;
}
