import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CommentInputDto {
  @IsString()
  @IsNotEmpty()
  @Length(100, 1000)
  content: string;
}
