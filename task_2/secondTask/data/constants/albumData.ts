import { IAlbum } from '../models/albumModel';

export const expectedAlbum: IAlbum = {
    userId: 1,
    id: 7,
    title: 'quibusdam autem aliquid et et quia',
};

export const expectedAlbumsByUserId: IAlbum[] = [
    {
        userId: 7,
        id: 61,
        title: 'delectus iusto et',
    },
    {
        userId: 7,
        id: 62,
        title: 'eos ea non recusandae iste ut quasi',
    },
    {
        userId: 7,
        id: 63,
        title: 'velit est quam',
    },
    {
        userId: 7,
        id: 64,
        title: 'autem voluptatem amet iure quae',
    },
    {
        userId: 7,
        id: 65,
        title: 'voluptates delectus iure iste qui',
    },
    {
        userId: 7,
        id: 66,
        title: 'velit sed quia dolor dolores delectus',
    },
    {
        userId: 7,
        id: 67,
        title: 'ad voluptas nostrum et nihil',
    },
    {
        userId: 7,
        id: 68,
        title: 'qui quasi nihil aut voluptatum sit dolore minima',
    },
    {
        userId: 7,
        id: 69,
        title: 'qui aut est',
    },
    {
        userId: 7,
        id: 70,
        title: 'et deleniti unde',
    },
];

export const newAlbum: IAlbum = {
    userId: 3,
    title: 'this is an album for testing',
};
