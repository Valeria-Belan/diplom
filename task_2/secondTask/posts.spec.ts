import {
    expectedComment,
    expectedPost,
    newPost,
    newTitle,
} from './data/constants/postData';
import {
    createNewPost,
    deletePost,
    getAllPosts,
    getCommentsById,
    getPostById,
    getPostsByUserId,
    updatePostTitle,
} from './api/endpoints/postsInfo';

describe('Posts testing', () => {
    it('1 - User can get all posts', async () => {
        //Пользователь может получить все посты
        const actualAllPosts = await getAllPosts();
        console.log(actualAllPosts);
        expect(actualAllPosts).toHaveLength(100);
    });
    it('2 - User can get post by id', async () => {
        //Пользователь может получить пост по его Id
        const actualPostById = await getPostById(1);
        console.log(actualPostById);
        expect(actualPostById).toEqual(expectedPost);
    });
    it('3 - User cannot get post by invalid id', async () => {
        //Пользователь должен получить ошибку 404 при попытке получить пост с несуществующим Id
        const invalidPostId = await getPostById(125).catch((error) => {
            console.log(error.status);
            expect(error.response.status).toBe(404);
        });
    });
    it('4 - User can get all posts by one userId', async () => {
        //Пользователь может получить все посты для конкретного пользователя по userId
        const actualPostsByUserId = await getPostsByUserId(2);
        console.log(actualPostsByUserId.length);
        expect(actualPostsByUserId).toHaveLength(10);
    });
    it('5 - User gets an empty array for non-existent user', async () => {
        //Пользователь получит пустой массив при попытке получить посты для несуществующего юзера
        const invalidUsertId = await getPostsByUserId(123456);
        console.log(invalidUsertId);
        expect(invalidUsertId).toEqual([]);
    });
    it('6 - User can get all comment to his post by Id', async () => {
        //Пользователь может получить все комментарии к посту по его Id
        const actualCommentsById = await getCommentsById(6);
        console.log(actualCommentsById);
        expect(actualCommentsById).toHaveLength(5);
        expect(actualCommentsById).toEqual(expectedComment);
    });
    it('7 - User can get an empty array by getting a comment to non-existent post', async () => {
        //Пользователь получит пустой массив при попытке получить комментарии к несуществующему посту
        const invalidCommentsById = await getPostsByUserId(123456);
        console.log(invalidCommentsById);
        expect(invalidCommentsById).toEqual([]);
    });
    it('8 - User can create a new post', async () => {
        //Пользователь может создать новый пост
        const newPostCreation = await createNewPost(newPost);
        console.log(newPostCreation);
        expect(newPostCreation.userId).toEqual(1);
    });
    it('9 - User can update a title of created post', async () => {
        //Пользователь может обновить заголовок (title) существующего поста
        const updatedPost = await updatePostTitle(5, newTitle);
        console.log(updatedPost);
        expect(updatedPost.title).toEqual(newTitle);
    });
    it('10 - User can delete post by Id', async () => {
        //Пользователь может удалить пост по Id
        const postDeleteOne = await deletePost(15);
        expect(postDeleteOne).toEqual({});
    });
});
