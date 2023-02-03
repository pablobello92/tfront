export interface MenuItem {
    label?: string;
    icon?: string;
    enabled: boolean;
    routerLink?: any;
    queryParams?: {
        [k: string]: any;
    };
};
