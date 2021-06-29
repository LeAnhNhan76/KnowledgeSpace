import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FunctionsComponent } from './functions/functions.component';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { SystemsRoutingModule } from './systems-routing.module';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { BlockUIModule } from 'primeng/blockui';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RoleDetailComponent } from './roles/role-detail/role-detail.component';
import { NotificationService } from '@app/shared/services';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ValidationMessageModule } from '@app/shared/modules/validation-message/validation-message.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentsService } from '@app/shared/services';
import { StudentsComponent } from './students/students.component';
import { StudentDetailComponent } from './students/student-detail/student-detail.component';
import { LoginComponent } from './login/login.component';
import { CheckLoginGuard, CheckSavingFormGuard } from '@app/shared/guard';

@NgModule({
  declarations: [FunctionsComponent, UsersComponent, RolesComponent, PermissionsComponent, RoleDetailComponent, StudentsComponent, StudentDetailComponent, LoginComponent],
  imports: [
    CommonModule,
    SystemsRoutingModule,
    PanelModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    BlockUIModule,
    InputTextModule,
    ProgressSpinnerModule,
    ModalModule.forRoot(),
    ValidationMessageModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    NotificationService,
    BsModalService,
    StudentsService,
    CheckLoginGuard,
    CheckSavingFormGuard
  ]
})
export class SystemsModule { }
