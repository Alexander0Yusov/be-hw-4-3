import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommentUpdateDto } from 'src/modules/bloggers-platform/dto/comment/comment-update.dto';
import { CommentsRepository } from 'src/modules/bloggers-platform/infrastructure/comments.repository';

export class UpdateCommentCommand {
  constructor(
    public dto: CommentUpdateDto,
    public commentId: string,
    public userId: string,
  ) {}
}

@CommandHandler(UpdateCommentCommand)
export class UpdateCommentUseCase
  implements ICommandHandler<UpdateCommentCommand, void>
{
  constructor(private commentsRepository: CommentsRepository) {}

  async execute({
    dto,
    commentId,
    userId,
  }: UpdateCommentCommand): Promise<void> {
    const comment =
      await this.commentsRepository.findByIdOrNotFoundFail(commentId);

    if (comment.commentatorInfo.userId?.toString() === userId) {
      comment.updateContent(dto.content);
      this.commentsRepository.save(comment);
    } else {
      // error
    }
  }
}
