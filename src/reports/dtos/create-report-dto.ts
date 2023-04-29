import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsLatitude,
  IsLongitude,
} from 'class-validator';

export class CreateReportDto {
  @IsString()
  make: string;

  @IsNumber()
  @Min(1930)
  @Max(2053)
  year: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;

  @IsLongitude()
  longitude: number;

  @IsLatitude()
  latitude: number;

  @IsNumber()
  @Min()
  @Max(1000000)
  price: number;

  @IsString()
  model: string;
}
