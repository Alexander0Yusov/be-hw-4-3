import { Like } from '../../domain/like/like.entity';
import { PostViewDto } from '../../dto/post/post-view.dto';

export const postItemsGetsMyStatus = (
  posts: PostViewDto[],
  likes: Like[],
): PostViewDto[] => {
  console.log(2222, posts);

  const updatedPosts = posts.map((post) => {
    const currentLike = likes.find(
      (like) => like.parentId.toString() === post.id,
    );

    if (currentLike) {
      post.extendedLikesInfo.myStatus = currentLike.status;
    }

    return post;
  });

  console.log(3333, updatedPosts);

  return updatedPosts;
};
