import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { CommentatorInfo, CommentatorInfoSchema } from './commentator-info';
import { CreateCommentDomainDto } from '../../dto/comment/create-comment-domain';

@Schema({ timestamps: true })
export class Comment {
  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: CommentatorInfoSchema })
  commentatorInfo: CommentatorInfo;

  @Prop({ type: Types.ObjectId, required: true })
  postId: Types.ObjectId;

  @Prop({ type: Number, required: true })
  likeCount: number;

  @Prop({ type: Number, required: true })
  dislikeCount: number;

  createdAt: Date;
  updatedAt: Date;

  static createInstance(dto: CreateCommentDomainDto): CommentDocument {
    const comment = new this();
    comment.content = dto.content;

    comment.commentatorInfo = new CommentatorInfo();
    comment.commentatorInfo.userId = dto.userId;
    comment.commentatorInfo.userLogin = dto.userLogin;

    comment.postId = dto.postId;
    comment.likeCount = dto.likeCount;
    comment.dislikeCount = dto.dislikeCount;

    return comment as CommentDocument;
  }

  //   static mapToView(like: Like) {
  //     return {
  //       addedAt: like.createdAt.toISOString(),
  //       userId: like.authorId.toString(),
  //       login: like.login,
  //     };
  //   }
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

//регистрирует методы сущности в схеме
CommentSchema.loadClass(Comment);

//Типизация документа
export type CommentDocument = HydratedDocument<Comment>;

//Типизация модели + статические методы
export type CommentModelType = Model<CommentDocument> & typeof Comment;
