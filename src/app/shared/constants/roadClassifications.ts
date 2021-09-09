export const ROAD_SEVERITY = {
    MIN: 0,
    MAX: 5,
    STEPS: 5
}

export enum SUMARIZATION_TYPES_VALUE {
    PREDICTION_ROADS,
    PREDICTION_ANOMALIES,
    SUMARIZATIONS,
};

export const ROAD_SEVERITY_CLASSIFICATION = {
    NO_EVENT: ROAD_SEVERITY.MIN, // 0
    VERY_LOW: ROAD_SEVERITY.MIN + (ROAD_SEVERITY.MAX / ROAD_SEVERITY.STEPS) * 1, // 1
    LOW: ROAD_SEVERITY.MIN + (ROAD_SEVERITY.MAX / ROAD_SEVERITY.STEPS) * 2, // 2
    MEDIUM: ROAD_SEVERITY.MIN + (ROAD_SEVERITY.MAX / ROAD_SEVERITY.STEPS) * 3, // 3
    HIGH: ROAD_SEVERITY.MIN + (ROAD_SEVERITY.MAX / ROAD_SEVERITY.STEPS) * 4, // 4
    VERY_HIGH: ROAD_SEVERITY.MAX, // 5
}

export enum ROAD_TYPES_CLASSIFICATION {
    ASPHALT = 0,
    COBBLES = 1,
    CONCRETE = 2,
    EARTH = 3,
}

export enum ANOMALY_TYPES_CLASSIFICATION {
    USER_ANSWERED_CALL = 0,
    USER_USED_DOOR = 1,
    USER_REPLIED_MESSAGE = 2,
    POTHOLE = 3,
    SPEED_BUMP = 4,
    STREET_GUTTER = 5,
}

export const ROAD_SEVERITY_DESCRIPTION = {
    NO_EVENT: 'no_event',
    VERY_LOW: 'very_low',
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    VERY_HIGH: 'very_high'
}

export enum ROAD_TYPES_DESCRIPTION {
    ASPHALT = 'asphalt',
    COBBLES = 'cobbles',
    CONCRETE = 'concrete',
    EARTH = 'earth',
}

export enum ANOMALY_TYPES_DESCRIPTION {
    USER_ANSWERED_CALL = 'user_answered_call',
    USER_USED_DOOR = 'user_used_door',
    USER_REPLIED_MESSAGE = 'user_replied_message',
    POTHOLE = 'pothole',
    SPEED_BUMP = 'speed_bump',
    STREET_GUTTER = 'street_gutter',
}

export enum ROAD_COLORS_SUMARIZATION {
    NO_EVENT = 'rgba(0, 255, 255, .75)',
    VERY_LOW = 'rgba(0, 255, 0, .75)',
    LOW = 'rgba(255, 255, 0, .75)',
    MEDIUM = 'rgba(255, 128, 0, .75)',
    HIGH = 'rgba(255, 0, 0, .75)',
    VERY_HIGH = 'rgba(128, 0, 255, .75)'
};

export enum ROAD_COLORS_PREDICTION_ROAD_TYPES {
    NO_EVENT = 'rgba(0, 255, 255, .75)',
    ASPHALT = 'rgba(173, 172, 172, .75)',
    COBBLES = 'rgba(55, 82, 163, .75)',
    CONCRETE = 'rgba(69, 69, 69, .75)',
    EARTH = 'rgba(110, 78, 38, .75)',
};

export enum ROAD_COLORS_PREDICTION_ANOMALY_TYPES {
    USER_ANSWERED_CALL = 'rgba(0, 255, 255, .75)',
    USER_USED_DOOR = 'rgba(173, 172, 172, .75)',
    USER_REPLIED_MESSAGE = 'rgba(55, 82, 163, .75)',
    POTHOLE = 'rgba(69, 69, 69, .75)',
    SPEED_BUMP = 'rgba(255, 238, 0, .75)',
    STREET_GUTTER = 'rgba(110, 78, 38, .75)',
};

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
