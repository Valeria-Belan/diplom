import {
    getPhotosByAlbumID,
    getPhotosByPhotoID,
    uploadNewPhoto,
} from './api/endpoints/photosInfo';
import {
    expectedOnePhoto,
    expectedPhotos,
    newPhoto,
} from './data/constants/photoData';

describe('Photos testing', () => {
    it('1 - User can get all photos in album by its Id', async () => {
        //Пользователь может получить все фото в альбоме по его Id
        const actualPhotosByAlbumID = await getPhotosByAlbumID(24);
        console.log(actualPhotosByAlbumID);
        expect(actualPhotosByAlbumID).toEqual(expectedPhotos);
    });

    it('2 - User can get photo by its id', async () => {
        //Пользователь может получить конкретное фото по его Id
        const actualPhotosByPhotoID = await getPhotosByPhotoID(34);
        console.log(actualPhotosByPhotoID);
        expect(actualPhotosByPhotoID).toEqual(expectedOnePhoto);
    });

    it('3 - User can post new photo', async () => {
        //Пользователь может загрузить новое фото
        const newPhotoCreation = await uploadNewPhoto(newPhoto);
        console.log(newPhotoCreation);
        expect(newPhotoCreation.albumId).toEqual(101);
    });

    //     it('4 - User can post new photo', async () => {
    //         //Пользователь не может загрузить новое фото, не указав albumId
    //         //!!! Загрузка фото проходит, не указав albumId
    //     });

    it('5 - User can post new photo', async () => {
        //Пользователь не может загрузить новое фото, указав Id несуществующего альбома
        const invalidPhotoId = await getPhotosByPhotoID(5003).catch((error) => {
            console.log(error.status);
            expect(error.response.status).toBe(404);
        });
    });
});
