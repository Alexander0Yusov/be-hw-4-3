import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './domain/blog/blog.entity';
import { BlogsController } from './api/blogs.controller';
import { BlogsRepository } from './infrastructure/blogs.repository';
import { BlogsService } from './application/blogs.service';
import { BlogsQueryRepository } from './infrastructure/query/blogs-query.repository';
import { PostsController } from './api/posts.controller';
import { PostsRepository } from './infrastructure/posts.repository';
import { PostsQueryRepository } from './infrastructure/query/posts-query.repository';
import { PostsService } from './application/posts.service';
import { Post, PostSchema } from './domain/post/post.entity';
import { Like, LikeSchema } from './domain/like/like.entity';
import { CommentsRepository } from './infrastructure/comments.repository';
import { CommentsService } from './application/comments.service';
import { CommentsController } from './api/comments.controller';
import { Comment, CommentSchema } from './domain/comment/comment.entity';
import { CommentsQueryRepository } from './infrastructure/query/comments-query.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Blog.name, schema: BlogSchema },
      { name: Like.name, schema: LikeSchema },
      { name: Post.name, schema: PostSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
  ],
  controllers: [BlogsController, PostsController, CommentsController],
  providers: [
    BlogsRepository,
    BlogsQueryRepository,
    BlogsService,
    //
    PostsRepository,
    PostsQueryRepository,
    PostsService,
    //
    CommentsQueryRepository,
    CommentsRepository,
    CommentsService,
  ],
  exports: [],
})
export class BloggersPlatformModule {}
