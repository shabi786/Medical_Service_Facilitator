import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() recordsPerPage = 10;
  @Input() totalRecords: number;
  @Output() clickedPage = new EventEmitter<number>();
  constructor() {}
  onPageChange(e): void {
    this.clickedPage.emit(e.page + 1);
  }
  ngOnInit(): void {}
}
