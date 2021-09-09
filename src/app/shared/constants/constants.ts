import {
    environment
} from '../../../environments/environment';

export const SERVER: string = environment.uri;

export const ENDPOINTS: any = {
    cities: {
        get: 'cities'
    },
    login: 'login',
    predictions: 'predictions',
    reparations: {
        get: 'reparations',
        insert: 'reparations/insert'
    },
    tracks: {
        get: 'tracks'
    },
    sumarizations: {
        index: 'sumarizations',
        get: 'sumarizations/get'
    },
    users: {
        get: 'users',
        update: 'users/update'
    }
};
