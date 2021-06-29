import { CanDeactivate } from "@angular/router";
import { StudentDetailComponent } from "@app/protected-zone/systems/students/student-detail/student-detail.component";

export class CheckSavingFormGuard implements CanDeactivate<StudentDetailComponent>{
    canDeactivate(component: StudentDetailComponent): boolean{
        alert('You can not leave this page without saving form');
        return false;
    }
}