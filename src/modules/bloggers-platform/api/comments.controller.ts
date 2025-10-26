import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommentInputDto } from '../dto/comment/comment-input.dto';
import { CommentViewDto } from '../dto/comment/comment-view.dto';
import { CommentsService } from '../application/comments.service';

@Controller('comments')
export class CommentsController {
  constructor(
    private commentsService: CommentsService,
    // private postsQueryRepository: PostsQueryRepository,
  ) {}

  //   @Post()
  //   async create(@Body() dto: CommentInputDto): Promise<CommentViewDto> {
  //     const postId = await this.commentsService.createPost(dto);

  //     return this.postsQueryRepository.findByIdOrNotFoundFail(postId);
  //   }

  // @Get(':id')
  // async getById(@Param('id') id: string): Promise<PostViewDto> {
  //    return this.postsQueryRepository.findByIdOrNotFoundFail(id);
  // }
}

// создать шину, зарегать, создать команду, обработчик
