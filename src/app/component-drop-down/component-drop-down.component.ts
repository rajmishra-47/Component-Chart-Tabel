import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { SharedService } from '../shared.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-component-drop-down',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './component-drop-down.component.html',
  styleUrl: './component-drop-down.component.css',
  providers:[DatePipe]
})
export class ComponentDropDownComponent {
  day: any;
  Month: any;
  Date: any;
  Year: any;

  constructor( private datePipe:DatePipe) {
    const currentDate = new Date();

    this.day = this.datePipe.transform(currentDate, 'EEEE'); // Full name of the day (e.g., Monday)
    this.Month = this.datePipe.transform(currentDate, 'MMMM'); // Full name of the month (e.g., January)
    this.Date = currentDate.getDate(); // Day of the month (1-31)
    this.Year = currentDate.getFullYear(); // Full year (e.g., 2024)
  }

  foods = [
    { value: '0', viewValue: 'A' },
    { value: '1', viewValue: 'B' },
    { value: '2', viewValue: 'C' },
  ];
}
