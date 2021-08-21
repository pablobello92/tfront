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
    NO_EVENT = '#00ffff',
    VERY_LOW = '#00ff00',
    LOW = '#ffff00',
    MEDIUM = '#ff8000',
    HIGH = '#ff0000',
    VERY_HIGH = '#8000ff'
};

export enum PREDICTION_TYPES {
    ROADS,
    ANOMALIES
}
