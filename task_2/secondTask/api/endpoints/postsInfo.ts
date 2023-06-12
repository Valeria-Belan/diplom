import { deleteMethod, getMethod, postMethod, updateMethod } from '../apiMethods';
import { IPost } from '../../data/models/postModel';
import { IComment } from '../../data/models/postModel';

export async function getAllPosts() : Promise<IPost[]> {
    //1 - Пользователь может получить все посты
    return await getMethod('/posts/');
}
export async function getPostById(id: number, query?: object, expectedError?: number): Promise<IPost> {
    //2 3  - Пользователь может получить пост по его Id
    return await getMethod(`/posts/${id}`, query, expectedError);
}
export async function getPostsByUserId(userId: number, expectedError?: number): Promise<IPost[]> {
    //4 5 - Пользователь может получить пост по его Id
    return await getMethod('/posts/', { userId: userId }, expectedError);
}
export async function getCommentsById(postId: number, expectedError?: number): Promise<IComment[]> {
    //6 7- Пользователь может получить все комментарии к посту по его Id
    return await getMethod(`/posts/${postId}/comments`, { postId: postId }, expectedError);
}
export async function createNewPost(newPostObject?: IPost, expectedError?: number): Promise<IPost>  {
    //8 - Пользователь может создать новый пост
    return await postMethod('/posts/', newPostObject ?? {}, expectedError);
}
export async function updatePostTitle(id: number, titleValue : string, expectedError?: number): Promise<IPost>  {
    //9 - Пользователь может обновить заголовок (title) существующего поста
    return await updateMethod('/posts/', id, titleValue, expectedError);
}
export async function deletePost(id: number, expectedError?: number): Promise<IPost>  {
    //10 - Пользователь может удалить пост по Id
    return await deleteMethod('/posts/', id, expectedError);
}