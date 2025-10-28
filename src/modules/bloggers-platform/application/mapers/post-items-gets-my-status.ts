import { Like } from '../../domain/like/like.entity';
import { PostViewDto } from '../../dto/post/post-view.dto';

export const postItemsGetsMyStatus = (
  posts: PostViewDto[],
  likes: Like[],
): PostViewDto[] => {
  const updatedPosts = posts.map((post) => {
    const currentLike = likes.find(
      (like) => like.parentId.toString() === post.id,
    );

    if (currentLike) {
      post.extendedLikesInfo.myStatus = currentLike.status;
    }

    return post;
  });

  return updatedPosts;
};
