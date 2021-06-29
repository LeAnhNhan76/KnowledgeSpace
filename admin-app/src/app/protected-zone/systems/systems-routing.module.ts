import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FunctionsComponent } from './functions/functions.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { RolesComponent } from './roles/roles.component';
import { StudentDetailComponent } from './students/student-detail/student-detail.component';
import { StudentsComponent } from './students/students.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { CheckLoginGuard, CheckSavingFormGuard } from '@app/shared';

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
        component: RolesComponent,
        canActivate: [CheckLoginGuard]
    },
    {
        path: 'permissions',
        component: PermissionsComponent
    },
    {
        path: 'students',
        component: StudentsComponent
    },
    {
        path: 'student-detail/:id',
        component: StudentDetailComponent,
        canDeactivate: [CheckSavingFormGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemsRoutingModule {}
