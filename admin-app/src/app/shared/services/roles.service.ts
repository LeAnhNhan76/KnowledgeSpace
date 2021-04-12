import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { catchError, map } from 'rxjs/operators';
import { Role, Pagination, Permission } from '../models';
import { roleUrls } from '@app/shared/services/commons/constants';

@Injectable({ providedIn: 'root' })
export class RolesService extends BaseService {
    private _sharedHeaders = new HttpHeaders();
    constructor(private http: HttpClient) {
        super();
        this._sharedHeaders = this._sharedHeaders.set('Content-Type', 'application/json');
    }
    add(entity: Role) {
        return this.http.post(roleUrls.add, JSON.stringify(entity), { headers: this._sharedHeaders })
            .pipe(catchError(this.handleError));
    }

    update(id: string, entity: Role) {
        return this.http.put(roleUrls.update.format(id), JSON.stringify(entity), { headers: this._sharedHeaders })
            .pipe(catchError(this.handleError));
    }

    getDetail(id) {
        return this.http.get<Role>(roleUrls.getDetail.format(id), { headers: this._sharedHeaders })
            .pipe(catchError(this.handleError));
    }

    getAllPaging(filter, pageIndex, pageSize) {
        return this.http.get<Pagination<Role>>(roleUrls.getAllPaging.format(pageIndex, pageSize, filter), { headers: this._sharedHeaders })
            .pipe(map((response: Pagination<Role>) => {
                return response;
            }), catchError(this.handleError));
    }

    delete(id) {
        return this.http.delete(roleUrls.delete.format(id), { headers: this._sharedHeaders })
            .pipe(
                catchError(this.handleError)
            );
    }

    getAll() {
        return this.http.get<Role[]>(roleUrls.getAll, { headers: this._sharedHeaders })
            .pipe(map((response: Role[]) => {
                return response;
            }), catchError(this.handleError));
    }
    getRolePermissions(roleId) {
        return this.http.get<Permission[]>(roleUrls.getRolePermissions.format(roleId), { headers: this._sharedHeaders })
            .pipe(catchError(this.handleError));
    }
}
