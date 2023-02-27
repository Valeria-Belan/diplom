import { IAlbum } from '../../data/models/albumModel';
import { getMethod, postMethod } from '../apiAlbum';

export async function getAllAlbums(): Promise<IAlbum[]> {
    //1 - Пользователь может получить все посты
    return await getMethod('/');
}

export async function getAlbumById(id: number, query?: object, expectedError?: number): Promise<IAlbum> {
    //2 - Пользователь может получить альбом по его Id
    return await getMethod(`/${id}`, query, expectedError);
}

export async function getAlbumByUserId(userId: number, expectedError?: number): Promise<IAlbum[]> {
    //3 - Пользователь может получить все альбомы конкретного пользователя по userId
    return await getMethod('/', { userId: userId }, expectedError);
}

export async function uploadNewAlbum(newAlbumObject?: IAlbum, expectedError?: number): Promise<IAlbum>  {
    //4 - ПольПользователь может добавить новый альбом
    return await postMethod('/', newAlbumObject ?? {}, expectedError);
}