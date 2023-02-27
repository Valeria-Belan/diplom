import superagent, { Response } from 'superagent';

const baseUrl = 'https://jsonplaceholder.typicode.com/photos';

async function handleResponse(response: Response, exspectedStatusCode: number) {
    expect(response.statusCode).toBe(exspectedStatusCode);
    return response.body;
}

export async function getMethod(path: string, query?: object, expectedError?: number) {
    const url = `${baseUrl}${path}`;
    const response = await superagent.get(url).query(query ?? {});     
    return handleResponse(response, expectedError ?? 200);
}

export async function postMethod(path: string, query?: object, expectedError?: number) {
    const url = `${baseUrl}${path}`;
    const response = await superagent.post(url).send(query ?? {});
    return handleResponse(response, expectedError ?? 201);
}