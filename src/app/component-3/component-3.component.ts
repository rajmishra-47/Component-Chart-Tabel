import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-component-3',
  standalone: true,
  imports: [MatInputModule,MatSelectModule,MatFormFieldModule,MatTableModule,MatIconModule,MatDividerModule,MatButtonModule],
  templateUrl: './component-3.component.html',
  styleUrl: './component-3.component.css'
})
export class Component3Component {

  displayedColumns: string[] = ['lable', 'num'];


  foods = [
    {value: '0', viewValue: 'A'},
    {value: '1', viewValue: 'B'},
    {value: '2', viewValue: 'C'}
  ];
}
