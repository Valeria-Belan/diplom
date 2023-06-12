import {
    getAlbumById,
    getAlbumByUserId,
    getAllAlbums,
    uploadNewAlbum,
} from './api/endpoints/albumsInfo';
import { expectedAlbum, newAlbum } from './data/constants/albumData';

describe('Albums testing', () => {
    it('1 - User can get all albums', async () => {
        //Пользователь может получить все альбомы
        const actualAllAlbums = await getAllAlbums();
        console.log(actualAllAlbums);
        expect(actualAllAlbums).toHaveLength(100);
    });
    it('2 - User can get all albums', async () => {
        //Пользователь может получить альбом по его Id
        const actualAlbumById = await getAlbumById(7);
        console.log(actualAlbumById);
        expect(actualAlbumById).toEqual(expectedAlbum);
    });
    it('3- User can get albums by one userId', async () => {
        //Пользователь может получить все альбомы конкретного пользователя по userId
        const actualAlbumByUserId = await getAlbumByUserId(7);
        console.log(actualAlbumByUserId);
        expect(actualAlbumByUserId).toHaveLength(10);
    });
    it('4 - User can create a new album', async () => {
        //Пользователь может добавить новый альбом
        const newAlbumCreation = await uploadNewAlbum(newAlbum);
        console.log(newAlbumCreation);
        expect(newAlbumCreation.userId).toEqual(3);
    });
});
