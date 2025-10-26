import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Types } from 'mongoose';
import { Post } from '../../domain/post/post.entity';
import type { PostModelType } from '../../domain/post/post.entity';
import { PostViewDto } from '../../dto/post/post-view.dto';
import { Like } from '../../domain/like/like.entity';
import type { LikeModelType } from '../../domain/like/like.entity';
import { GetPostsQueryParams } from '../../dto/post/get-posts-query-params.input-dto';
import { PaginatedViewDto } from '../../../../core/dto/base.paginated.view-dto';
import { Blog, type BlogModelType } from '../../domain/blog/blog.entity';
import {
  Comment,
  CommentDocument,
  type CommentModelType,
} from '../../domain/comment/comment.entity';
import { CommentViewDto } from '../../dto/comment/comment-view.dto';

@Injectable()
export class CommentsQueryRepository {
  constructor(
    @InjectModel(Comment.name) private CommentModel: CommentModelType,
    @InjectModel(Like.name) private LikeModel: LikeModelType,
    //  @InjectModel(Blog.name) private BlogModel: BlogModelType,
  ) {}

  async findByIdOrNotFoundFail(
    parentId: string,
    authorId: string = '',
  ): Promise<CommentViewDto> {
    const comment = await this.CommentModel.findById(parentId);

    if (!comment) {
      throw new NotFoundException('post not found');
    }

    const filter: Record<string, any> = {
      parentId: new Types.ObjectId(parentId),
      parentModel: 'Comment',
    };

    if (authorId) {
      filter.authorId = new Types.ObjectId(authorId);
    }

    const myLike = await this.LikeModel.findOne(filter).lean();

    return CommentViewDto.mapToView(comment, myLike?.status);
  }

  //   async getAll(
  //     query: GetPostsQueryParams,
  //     blogId?: string,
  //   ): Promise<PaginatedViewDto<PostViewDto[]>> {
  //     let filter = {};

  //     if (blogId) {
  //       const blog = await this.BlogModel.findById(blogId);
  //       if (!blog) {
  //         throw new NotFoundException('blog not found');
  //       }
  //       filter = { blogId: new Types.ObjectId(blogId) };
  //     }

  //     const posts = await this.PostModel.find(filter)
  //       .sort({ [query.sortBy]: query.sortDirection })
  //       .skip(query.calculateSkip())
  //       .limit(query.pageSize);

  //     const totalCount = await this.PostModel.countDocuments(filter);

  //     const items = posts.map((post) => PostViewDto.mapToView(post, post._id));

  //     return PaginatedViewDto.mapToView({
  //       items,
  //       totalCount,
  //       page: query.pageNumber,
  //       size: query.pageSize,
  //     });
  //   }
}
