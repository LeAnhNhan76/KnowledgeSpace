import { environment } from '@environments/environment';

export const userUrls = {
    getAll : environment.apiUrl + "/api/v1/users",
    getMenuByUser : environment.apiUrl + "/api/v1/users/{0}/menu",
};

export const roleUrls = {
    add: environment.apiUrl + "/api/v1/roles",
    update: environment.apiUrl + "/api/v1/roles/{0}",
    getDetail: environment.apiUrl + "/api/v1/roles/{0}",
    getAllPaging: environment.apiUrl + "/api/v1/roles/filter?pageIndex={0}&pageSize={1}&filter={2}",
    delete: environment.apiUrl + "/api/v1/roles/{0}",
    getAll: environment.apiUrl + "/api/v1/roles",
    getRolePermissions: environment.apiUrl + "/api/v1/roles/{0}/permissions"
}
