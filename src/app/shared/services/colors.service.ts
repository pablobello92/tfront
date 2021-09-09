import {
    Injectable
} from '@angular/core';
import {
    SUMARIZATION_TYPES_VALUE,
    ROAD_COLORS_SUMARIZATION,
    ROAD_COLORS_PREDICTION_ROAD_TYPES,
    ROAD_TYPES_CLASSIFICATION,
    ROAD_TYPES_DESCRIPTION,
    ANOMALY_TYPES_CLASSIFICATION,
    ROAD_COLORS_PREDICTION_ANOMALY_TYPES,
    ANOMALY_TYPES_DESCRIPTION,
    ROAD_SEVERITY_CLASSIFICATION,
    ROAD_SEVERITY_DESCRIPTION
} from '../constants/roadClassifications';
import {
    ColorItem
} from '../interfaces/Polyline';

@Injectable()
export class ColorsService {

    constructor(
    ) {}

    private COLOR_MAPPING_PREDICTION_ROADS: Map<number, ColorItem> = new Map<number, ColorItem>([
        [ROAD_TYPES_CLASSIFICATION.ASPHALT, {
            score: ROAD_TYPES_CLASSIFICATION.ASPHALT,
            text: ROAD_TYPES_DESCRIPTION.ASPHALT,
            background: ROAD_COLORS_PREDICTION_ROAD_TYPES.ASPHALT
        }],
        [ROAD_TYPES_CLASSIFICATION.COBBLES, {
            score: ROAD_TYPES_CLASSIFICATION.COBBLES,
            text: ROAD_TYPES_DESCRIPTION.COBBLES,
            background: ROAD_COLORS_PREDICTION_ROAD_TYPES.COBBLES
        }],
        [ROAD_TYPES_CLASSIFICATION.CONCRETE, {
            score: ROAD_TYPES_CLASSIFICATION.CONCRETE,
            text: ROAD_TYPES_DESCRIPTION.CONCRETE,
            background: ROAD_COLORS_PREDICTION_ROAD_TYPES.CONCRETE
        }],
        [ROAD_TYPES_CLASSIFICATION.EARTH, {
            score: ROAD_TYPES_CLASSIFICATION.EARTH,
            text: ROAD_TYPES_DESCRIPTION.EARTH,
            background: ROAD_COLORS_PREDICTION_ROAD_TYPES.EARTH
        }]
    ]);

    private COLOR_MAPPING_PREDICTION_ANOMALIES: Map<number, ColorItem> = new Map<number, ColorItem>([
        [ANOMALY_TYPES_CLASSIFICATION.USER_ANSWERED_CALL, {
            score: ANOMALY_TYPES_CLASSIFICATION.USER_ANSWERED_CALL,
            text: ANOMALY_TYPES_DESCRIPTION.USER_ANSWERED_CALL,
            background: ROAD_COLORS_PREDICTION_ANOMALY_TYPES.USER_ANSWERED_CALL
        }],
        [ANOMALY_TYPES_CLASSIFICATION.USER_USED_DOOR, {
            score: ANOMALY_TYPES_CLASSIFICATION.USER_USED_DOOR,
            text: ANOMALY_TYPES_DESCRIPTION.USER_USED_DOOR,
            background: ROAD_COLORS_PREDICTION_ANOMALY_TYPES.USER_USED_DOOR
        }],
        [ANOMALY_TYPES_CLASSIFICATION.USER_REPLIED_MESSAGE, {
            score: ANOMALY_TYPES_CLASSIFICATION.USER_REPLIED_MESSAGE,
            text: ANOMALY_TYPES_DESCRIPTION.USER_REPLIED_MESSAGE,
            background: ROAD_COLORS_PREDICTION_ANOMALY_TYPES.USER_REPLIED_MESSAGE
        }],
        [ANOMALY_TYPES_CLASSIFICATION.POTHOLE, {
            score: ANOMALY_TYPES_CLASSIFICATION.POTHOLE,
            text: ANOMALY_TYPES_DESCRIPTION.POTHOLE,
            background: ROAD_COLORS_PREDICTION_ANOMALY_TYPES.POTHOLE
        }],
        [ANOMALY_TYPES_CLASSIFICATION.SPEED_BUMP, {
            score: ANOMALY_TYPES_CLASSIFICATION.SPEED_BUMP,
            text: ANOMALY_TYPES_DESCRIPTION.SPEED_BUMP,
            background: ROAD_COLORS_PREDICTION_ANOMALY_TYPES.SPEED_BUMP
        }],
        [ANOMALY_TYPES_CLASSIFICATION.STREET_GUTTER, {
            score: ANOMALY_TYPES_CLASSIFICATION.STREET_GUTTER,
            text: ANOMALY_TYPES_DESCRIPTION.STREET_GUTTER,
            background: ROAD_COLORS_PREDICTION_ANOMALY_TYPES.STREET_GUTTER
        }]
    ]);

    private COLOR_MAPPING_SUMARIZATION: Map<number, ColorItem> = new Map<number, ColorItem>([
        [ROAD_SEVERITY_CLASSIFICATION.NO_EVENT, {
            score: ROAD_SEVERITY_CLASSIFICATION.NO_EVENT,
            text: ROAD_SEVERITY_DESCRIPTION.NO_EVENT,
            background: ROAD_COLORS_SUMARIZATION.NO_EVENT
        }],
        [ROAD_SEVERITY_CLASSIFICATION.VERY_LOW, {
            score: ROAD_SEVERITY_CLASSIFICATION.VERY_LOW,
            text: ROAD_SEVERITY_DESCRIPTION.VERY_LOW,
            background: ROAD_COLORS_SUMARIZATION.VERY_LOW
        }],
        [ROAD_SEVERITY_CLASSIFICATION.LOW, {
            score: ROAD_SEVERITY_CLASSIFICATION.LOW,
            text: ROAD_SEVERITY_DESCRIPTION.LOW,
            background: ROAD_COLORS_SUMARIZATION.LOW
        }],
        [ROAD_SEVERITY_CLASSIFICATION.MEDIUM, {
            score: ROAD_SEVERITY_CLASSIFICATION.MEDIUM,
            text: ROAD_SEVERITY_DESCRIPTION.MEDIUM,
            background: ROAD_COLORS_SUMARIZATION.MEDIUM
        }],
        [ROAD_SEVERITY_CLASSIFICATION.HIGH, {
            score: ROAD_SEVERITY_CLASSIFICATION.HIGH,
            text: ROAD_SEVERITY_DESCRIPTION.HIGH,
            background: ROAD_COLORS_SUMARIZATION.HIGH
        }],
        [ROAD_SEVERITY_CLASSIFICATION.VERY_HIGH, {
            score: ROAD_SEVERITY_CLASSIFICATION.VERY_HIGH,
            text: ROAD_SEVERITY_DESCRIPTION.VERY_HIGH,
            background: ROAD_COLORS_SUMARIZATION.VERY_HIGH
        }]
    ]);

    private colorMappings: Map<number, Map<number, ColorItem>> = new Map<number, Map<number, ColorItem>>([
        [ SUMARIZATION_TYPES_VALUE.PREDICTION_ROADS, this.COLOR_MAPPING_PREDICTION_ROADS ],
        [ SUMARIZATION_TYPES_VALUE.PREDICTION_ANOMALIES, this.COLOR_MAPPING_PREDICTION_ANOMALIES ],
        [ SUMARIZATION_TYPES_VALUE.SUMARIZATIONS, this.COLOR_MAPPING_SUMARIZATION ],
    ]);

    public getColorMappingsAsArray(t: SUMARIZATION_TYPES_VALUE = SUMARIZATION_TYPES_VALUE.SUMARIZATIONS): ColorItem[] {
        const colorMap = this.colorMappings.get(t);
        const colors = [...colorMap].map(([key, value]) => value);
        return colors;
    }

    public getColor(score: number, colors: ColorItem[]): string {
        let i = 0;
        let color = null;
        while (i < colors.length) {
            if (score > colors[i].score) {
                i++;
            } else {
                color = colors[i].background;
                i = colors.length;
            }
        }
        return color;
    }
}
