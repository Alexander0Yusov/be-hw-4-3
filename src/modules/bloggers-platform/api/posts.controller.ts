import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from '../application/posts.service';
import { PostsQueryRepository } from '../infrastructure/query/posts-query.repository';
import { PostInputDto } from '../dto/post/post-iput.dto';
import { PostViewDto } from '../dto/post/post-view.dto';
import { GetPostsQueryParams } from '../dto/post/get-posts-query-params.input-dto';
import { PaginatedViewDto } from 'src/core/dto/base.paginated.view-dto';
import { PostUpdateDto } from '../dto/post/post-update.dto';
import { CommentViewDto } from '../dto/comment/comment-view.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CommentInputDto } from '../dto/comment/comment-input.dto';
import { CreateCommentCommand } from '../application/usecases/comments/create-comment.usecase';
import { ExtractUserFromRequest } from 'src/modules/user-accounts/guards/decorators/param/extract-user-from-request.decorator';
import { UserContextDto } from 'src/modules/user-accounts/guards/dto/user-context.dto';
import { JwtAuthGuard } from 'src/modules/user-accounts/guards/bearer/jwt-auth.guard';
import { CommentsQueryRepository } from '../infrastructure/query/comments-query.repository';

@Controller('posts')
export class PostsController {
  constructor(
    private postsService: PostsService,
    private postsQueryRepository: PostsQueryRepository,
    private commentsQueryRepository: CommentsQueryRepository,
    private commandBus: CommandBus,
  ) {}

  @Post()
  async create(@Body() dto: PostInputDto): Promise<PostViewDto> {
    const postId = await this.postsService.createPost(dto);

    return this.postsQueryRepository.findByIdOrNotFoundFail(postId);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<PostViewDto> {
    return this.postsQueryRepository.findByIdOrNotFoundFail(id);
  }

  @Get()
  async getAll(
    @Query() query: GetPostsQueryParams,
  ): Promise<PaginatedViewDto<PostViewDto[]>> {
    const blogs = await this.postsQueryRepository.getAll(query);
    return blogs;
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updatePost(
    @Param('id') id: string,
    @Body() body: PostUpdateDto,
  ): Promise<void> {
    await this.postsService.updatePost(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePost(@Param('id') id: string): Promise<void> {
    return this.postsService.deletePost(id);
  }
  //

  @UseGuards(JwtAuthGuard)
  @Post(':id/comments')
  async createCommentForCurrentPost(
    @Param('id') id: string,
    @Body() body: CommentInputDto,
    @ExtractUserFromRequest() user: UserContextDto,
  ): Promise<CommentViewDto> {
    const commentId = await this.commandBus.execute(
      new CreateCommentCommand(body, id, user.id),
    );

    return this.commentsQueryRepository.findByIdOrNotFoundFail(commentId);
  }
}
