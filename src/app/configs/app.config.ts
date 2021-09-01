import {
    environment
} from '../../environments/environment';

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

export enum ROAD_COLORS {
    NO_EVENT = 'rgba(0, 255, 255, .75)',
    VERY_LOW = 'rgba(0, 255, 0, .75)',
    LOW = 'rgba(255, 255, 0, .75)',
    MEDIUM = 'rgba(255, 128, 0, .75)',
    HIGH = 'rgba(255, 0, 0, .75)',
    VERY_HIGH = 'rgba(128, 0, 255, .75)'
};

export enum SUMARIZATION_TYPES_VALUE {
    PREDICTION_ROADS,
    PREDICTION_ANOMALIES,
    SUMARIZATIONS,
};

/* export const SUMARIZATION_TYPES_LABEL: Map<SUMARIZATION_TYPES_VALUE, string> = new Map<SUMARIZATION_TYPES_VALUE, string>(); */

export const SUMARIZATION_TYPES_PAIRS = [{
        label: 'general.prediction_roads',
        value: SUMARIZATION_TYPES_VALUE.PREDICTION_ROADS
    },
    {
        label: 'general.prediction_anomalies',
        value: SUMARIZATION_TYPES_VALUE.PREDICTION_ANOMALIES
    },
    {
        label: 'general.sumarization',
        value: SUMARIZATION_TYPES_VALUE.SUMARIZATIONS
}];

export enum ROAD_TYPES {
    ASPHALT = 0,
    COBBLES = 1,
    CONCRETE = 2,
    EARTH = 3,
}

export enum ROAD_TYPES_DESCRIPTION {
    ASPHALT = 'Asphalt',
    COBBLES = 'Cobbles',
    CONCRETE = 'Concrete',
    EARTH = 'Earth',
}

export enum ANOMALIES {
    USER_ANSWERED_CALL = 0,
    USER_USED_DOOR = 1,
    USER_REPLIED_MESSAGE = 2,
    POTHOLE = 3,
    SPEED_BUMP = 4,
    STREET_GUTTER = 5,
}

export enum ANOMALIES_DESCRIPTION {
    USER_ANSWERED_CALL = 'User answered a call',
    USER_USED_DOOR = 'USer open or closed a door',
    USER_REPLIED_MESSAGE = 'User replied a message',
    POTHOLE = 'Pothole',
    SPEED_BUMP = 'Speed Bump',
    STREET_GUTTER = 'Street Gutter',
}
