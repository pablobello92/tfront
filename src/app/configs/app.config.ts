import {
    environment
} from '../../environments/environment';

export const SERVER: string = environment.uri;

export const ENDPOINTS: any = {
    cities: {
        get: 'cities'
    },
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
    },
    login: 'login'
};

export enum ROAD_COLORS {
    NO_EVENT = 'rgba(0, 255, 255, .75)',
    VERY_LOW = 'rgba(0, 255, 0, .75)',
    LOW = 'rgba(255, 255, 0, .75)',
    MEDIUM = 'rgba(255, 128, 0, .75)',
    HIGH = 'rgba(255, 0, 0, .75)',
    VERY_HIGH = 'rgba(128, 0, 255, .75)'
};

export enum PREDICTION_TYPES {
    ROADS,
    ANOMALIES
}
