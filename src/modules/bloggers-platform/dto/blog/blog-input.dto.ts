import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class BlogInputDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUrl()
  websiteUrl: string;
}
