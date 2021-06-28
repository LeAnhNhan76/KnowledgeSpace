import { RoleDetailComponent } from './role-detail/role-detail.component';
import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MessageConstants } from '@app/shared/core/constants';
import { NotificationService, RolesService } from '@app/shared/services';
import { Pagination, Role } from '@app/shared/models';
import { Subscription } from 'rxjs';
import { StudentsService } from '@app/shared/services/students.service'
import { Router } from '@angular/router';

@Component({
    selector: 'app-roles',
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
    private subscription = new Subscription();
    // Default
    public bsModalRef: BsModalRef;
    public blockedPanel = false;
    /**
     * Paging
     */
    public pageIndex = 1;
    public pageSize = 10;
    public pageDisplay = 10;
    public rowsPerPageOptions = [10, 20, 50, 100];
    public totalRecords: number;
    public keyword = '';
    // Role
    public items: any[];
    public selectedItems = [];
    public applyClass = false;
    public titleText = 'Danh sách nhóm quyền';
    public fname = '';
    public lname = '';
    public hiddenFullName = false;
    public color = '';
    public colors: string[] = ['red', 'blue', 'green'];
    public cone = true;
    public ctwo = true;
    public voted: boolean = false;
    public resultVote: string = '';
    public today = Date.now();
    public percent = 0.89145;
    public number: number = 2;
    public object: string[] = ['a', 'b', 'c', 'd', 'e'];
    public cities: object[] = [{ id: 1, name: 'Ho Chi Minh' },{ id: 2, name: 'Ha Noi' },{ id: 3, name: 'Da Nang' }];
    public students : any[]= [];

    @Input() public name: string;
    @Output() public onReturnResultVote = new EventEmitter<boolean>();

    constructor(
        private rolesService: RolesService,
        private modalService: BsModalService,
        private notificationService: NotificationService,
        private studentsService: StudentsService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.loadData();
        // this.studentsService.GetAll().subscribe((response: any) => this.students = response
        // , (error) => {
        //     console.log('error', error);
        // });
        this.studentsService.GetAll().subscribe({
            next: (response) => {
                this.students = response;
            },
            error: (error) => {
                console.log('error', error);
            }
        })
    }

    loadData(selectedId = null) {
        this.blockedPanel = true;
        this.subscription.add(
            this.rolesService.getAllPaging(this.keyword, this.pageIndex, this.pageSize).subscribe(
                (response: Pagination<Role>) => {
                    this.processLoadData(selectedId, response);
                    setTimeout(() => {
                        this.blockedPanel = false;
                    }, 1000);
                },
                (error) => {
                    setTimeout(() => {
                        this.blockedPanel = false;
                    }, 1000);
                }
            )
        );
    }

    private processLoadData(selectedId = null, response: Pagination<Role>) {
        console.log('response', response);

        this.items = response.items;
        this.pageIndex = this.pageIndex;
        this.pageSize = this.pageSize;
        this.totalRecords = response.totalRecords;
        if (this.selectedItems.length === 0 && this.items.length > 0) {
            this.selectedItems.push(this.items[0]);
        }
        if (selectedId != null && this.items.length > 0) {
            this.selectedItems = this.items.filter((x) => x.Id === selectedId);
        }
    }
    pageChanged(event: any): void {
        this.pageIndex = event.page + 1;
        this.pageSize = event.rows;
        this.loadData();
    }

    showAddModal() {
        this.bsModalRef = this.modalService.show(RoleDetailComponent, {
            class: 'modal-lg',
            backdrop: 'static'
        });
        this.bsModalRef.content.savedEvent.subscribe((response) => {
            this.bsModalRef.hide();
            this.loadData();
            this.selectedItems = [];
        });
    }
    showEditModal() {
        if (this.selectedItems.length === 0) {
            this.notificationService.showError(MessageConstants.NOT_CHOOSE_ANY_RECORD);
            return;
        }
        const initialState = {
            entityId: this.selectedItems[0].id
        };
        this.bsModalRef = this.modalService.show(RoleDetailComponent, {
            initialState: initialState,
            class: 'modal-lg',
            backdrop: 'static'
        });

        this.subscription.add(
            this.bsModalRef.content.savedEvent.subscribe((response) => {
                this.bsModalRef.hide();
                this.loadData(response.id);
            })
        );
    }

    deleteItems() {
        const id = this.selectedItems[0].id;
        this.notificationService.showConfirmation(MessageConstants.CONFIRM_DELETE_MSG, () =>
            this.deleteItemsConfirm(id)
        );
    }
    deleteItemsConfirm(id) {
        this.blockedPanel = true;
        this.subscription.add(
            this.rolesService.delete(id).subscribe(
                () => {
                    this.notificationService.showSuccess(MessageConstants.DELETED_OK_MSG);
                    this.loadData();
                    this.selectedItems = [];
                    setTimeout(() => {
                        this.blockedPanel = false;
                    }, 1000);
                },
                (error) => {
                    setTimeout(() => {
                        this.blockedPanel = false;
                    }, 1000);
                }
            )
        );
    }

    onClick(value) {
        this.cone = !this.cone;
        this.ctwo = !this.ctwo;
        this.fname = 'red';
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onVote(agree: boolean) {
        this.voted = true;
        this.resultVote = agree ? 'agreed' : 'disagreed';
        this.onReturnResultVote.emit(agree);
    }

    onSubmitForm(value: any) {
        console.log('form', value);
    }

    onNaviageToUsersListPage() : void {
        this.router.navigate(['systems','users']);
    }
}
