import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FunctionsComponent } from './functions/functions.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { RolesComponent } from './roles/roles.component';
import { StudentsComponent } from './students/students.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
    {
        path: '',
        component: UsersComponent
    },
    {
        path: 'users',
        component: UsersComponent
    },
    {
        path: 'functions',
        component: FunctionsComponent
    },
    {
        path: 'roles',
        component: RolesComponent
    },
    {
        path: 'permissions',
        component: PermissionsComponent
    },
    {
        path: 'students',
        component: StudentsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemsRoutingModule {}
