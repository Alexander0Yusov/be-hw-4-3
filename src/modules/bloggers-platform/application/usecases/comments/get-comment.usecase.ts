import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LikeStatus } from 'src/modules/bloggers-platform/domain/like/like.entity';
import { CommentViewDto } from 'src/modules/bloggers-platform/dto/comment/comment-view.dto';
import { CommentsRepository } from 'src/modules/bloggers-platform/infrastructure/comments.repository';
import { LikesRepository } from 'src/modules/bloggers-platform/infrastructure/likes.repository';
import { CommentsQueryRepository } from 'src/modules/bloggers-platform/infrastructure/query/comments-query.repository';

export class GetCommentCommand {
  constructor(
    public commentId: string,
    public userId: string = '',
  ) {}
}

@CommandHandler(GetCommentCommand)
export class GetCommentUseCase
  implements ICommandHandler<GetCommentCommand, CommentViewDto>
{
  constructor(
    private commentsRepository: CommentsRepository,
    private likesRepository: LikesRepository,
  ) {}

  async execute({
    commentId,
    userId = '',
  }: GetCommentCommand): Promise<CommentViewDto> {
    // делаем квери запрос на комментарий и лайк. затем лепим вью обьект
    const comment =
      await this.commentsRepository.findByIdOrNotFoundFail(commentId);

    if (userId) {
      const like = await this.likesRepository.findByCommentIdByAuthorId(
        commentId,
        userId,
      );

      if (like) {
        return CommentViewDto.mapToView(comment, like.status);
      }
    }

    return CommentViewDto.mapToView(comment);
  }
}
