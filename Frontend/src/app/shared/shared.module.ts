import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { AccordionComponent } from './accordion/accordion.component';
import { AppointmentCardComponent } from './appointment-card/appointment-card.component';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TimelineModule } from 'primeng/timeline';

@NgModule({
  declarations: [
    PaginationComponent,
    AccordionComponent,
    AppointmentCardComponent,
  ],
  imports: [
    CommonModule,
    PaginatorModule,
    CardModule,
    ButtonModule,
    DialogModule,
    TimelineModule,
  ],
  exports: [PaginationComponent, AccordionComponent, AppointmentCardComponent],
})
export class SharedModule {}
