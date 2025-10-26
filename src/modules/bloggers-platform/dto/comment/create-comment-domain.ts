import { Types } from 'mongoose';

export class CreateCommentDomainDto {
  content: string;
  userId: Types.ObjectId;
  userLogin: string;
  postId: Types.ObjectId;
  likeCount: number;
  dislikeCount: number;
}
