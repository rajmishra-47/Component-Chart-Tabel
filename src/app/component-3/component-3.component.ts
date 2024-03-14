import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-component-3',
  standalone: true,
  imports: [MatInputModule,MatSelectModule,MatFormFieldModule,MatTableModule,MatIconModule,MatDividerModule,MatButtonModule,FormsModule,CommonModule],
  templateUrl: './component-3.component.html',
  styleUrl: './component-3.component.css'
})
export class Component3Component {

Names=['Captured','Injected']
Values=[111111,111111]


jsn:any={}

}
