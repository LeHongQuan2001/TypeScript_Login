import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { DeleteSuccessService } from '../../services/delete-success.service';
import { ApiService } from 'src/app/main/shared/httpApi/api.service';
import { UserPageService } from 'src/app/main/pages/user-page/services/user-page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-success',
  templateUrl: './delete-success.component.html',
  styleUrls: ['./delete-success.component.scss']
})

export class DeleteSuccessComponent {
  constructor(private userPageService: UserPageService, private http: ApiService, private router: Router) {}

  @Input() isDeleteSuccess: boolean = false;
  @Output() close = new EventEmitter<void>();

  closeDialog(): void {
    this.close.emit();
  }

}
