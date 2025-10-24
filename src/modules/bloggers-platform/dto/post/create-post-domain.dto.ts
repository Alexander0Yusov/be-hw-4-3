import { Types } from 'mongoose';
import { Like } from '../../domain/like/like.entity';

export class CreatePostDomainDto {
  title: string;
  shortDescription: string;
  content: string;
  blogId: Types.ObjectId;
  blogName: string;
  //
  likesCount: number;
  dislikesCount: number;
  newestLikes: Like[];
}
