import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DomainExceptionCode } from 'src/core/exceptions/domain-exception-codes';
import { DomainException } from 'src/core/exceptions/domain-exceptions';
import { LikeInputDto } from 'src/modules/bloggers-platform/dto/like/like-input.dto';
import { CommentsRepository } from 'src/modules/bloggers-platform/infrastructure/comments.repository';
import { LikesRepository } from 'src/modules/bloggers-platform/infrastructure/likes.repository';

export class UpdateCommentLikeStatusCommand {
  constructor(
    public dto: LikeInputDto,
    public parentId: string,
    public userId: string,
  ) {}
}

@CommandHandler(UpdateCommentLikeStatusCommand)
export class UpdateCommentLikeStatusUseCase
  implements ICommandHandler<UpdateCommentLikeStatusCommand, void>
{
  constructor(
    private commentsRepository: CommentsRepository,
    private likesRepository: LikesRepository,
  ) {}

  async execute({
    dto,
    parentId,
    userId,
  }: UpdateCommentLikeStatusCommand): Promise<void> {
    const comment =
      await this.commentsRepository.findByIdOrNotFoundFail(parentId);

    // создание/обновление записи в коллекции лайков
    await this.likesRepository.createOrUpdate(
      parentId,
      userId,
      dto.likeStatus,
      comment!.commentatorInfo!.userLogin!,
    );

    // пересчет счетчиков
    const { likes, dislikes } =
      await this.likesRepository.countReactions(parentId);

    // правка и сохранение отредактированного комметария в репозитории
    comment.updateLikesCounters(likes, dislikes);
    await this.commentsRepository.save(comment);
  }
}
