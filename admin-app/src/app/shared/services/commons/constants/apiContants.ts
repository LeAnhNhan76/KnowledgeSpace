import { environment } from '@environments/environment';

export const userUrls = {
    getAll : environment.apiUrl + "/api/v1/users",
    getMenuByUser : environment.apiUrl + "/api/v1/users/{0}/menu",
};
