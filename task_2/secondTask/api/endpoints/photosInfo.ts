import { IPhoto } from "../../data/models/photoModel";
import { getMethod, postMethod } from "../apiMethods";

export async function getPhotosByAlbumID(albumId: number, expectedError?: number): Promise<IPhoto[]> {
    //1 - Пользователь может получить все фото в альбоме по его Id
    return await getMethod('/photos/', { albumId: albumId }, expectedError);
}
export async function getPhotosByPhotoID(id: number, query?: object, expectedError?: number): Promise<IPhoto> {
    //2 - Пользователь может получить конкретное фото по его Id
    return await getMethod(`/photos/${id}`, query, expectedError);
}
export async function uploadNewPhoto(newPhotoObject?: IPhoto, expectedError?: number): Promise<IPhoto>  {
    //3 4 5 - Пользователь может загрузить новое фото
    return await postMethod('/photos/', newPhotoObject ?? {}, expectedError);
}