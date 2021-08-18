export interface MenuItem {
    label?: String;
    icon?: string;
    enabled: boolean;
    routerLink?: any;
    queryParams?: {
        [k: string]: any;
    };
};
