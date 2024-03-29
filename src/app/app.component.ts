import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Component3Component } from './component-3/component-3.component';
import Chart from 'chart.js/auto';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentDropDownComponent } from './component-drop-down/component-drop-down.component';
import { SharedService } from './shared.service';
import { Subscription } from 'rxjs';
import { GraphTableComponent } from './graph-table/graph-table.component';
import { tap } from 'rxjs/operators';
import { response } from 'express';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    HttpClientModule,
    ReactiveFormsModule,
    ComponentDropDownComponent,
    Component3Component,
    GraphTableComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Frontend';

  constructor(private http: HttpClient) {}

  a: number = 0;
  b: number = 0;

  Wells: any;
  WellsName: any;
  WellsVal: number[] = [];

  Res: any;
  ResName: any;
  ResVal: number[] = [];

  TotalName: any;
  TotalVal: any;

  chart1: any;
  chart2: any;
  chart3: any;

  chartDisabled: boolean = false;

  editflag1: boolean = false;
  editflag2: boolean = false;

  Wflag: boolean = false;
  Rflag: boolean = false;

  Wb1: string = 'Edit';
  Rb1: string = 'Edit';
  
 

  v: any = 1;

  t1: any;

  s1 = 0;
  s2 = 0;
  mt: null = null;
  Total: any;

  color1: any = ['#E6B056', '#DD2CC7'];
  color2: any = ['#B49566', '#DD2CC7', '#DD887C', '#4CA2A8'];
  color3: any = ['#666EB4', '#AF74B9'];

  resname = ['Reservoir 1', 'Reservoir 2'];
  resval: number[] = [];

  onRowClicked(dummy: any) {}

  displayedColumns: string[] = ['lable', 'num'];

  ngOnInit() {
    this.http.get('http://localhost:8000/showWell').subscribe((data: any) => {
      this.Wells = data;

      this.WellsName = this.Wells.map((data: any) => data.wname);

      this.WellsVal = this.Wells.map((data: any) => Number(data.wval));

      this.createChart2(this.WellsName, this.WellsVal);

      this.WellsVal.forEach((e: number) => {
        this.s1 += e;
      });
    });

    this.http.get('http://localhost:8000/showRes').subscribe((data: any) => {
      this.Res = data;
      this.ResName = this.Res.map((data: any) => data.resName);
      this.ResVal = this.Res.map((data: any) => Number(data.resval));
      this.resval = this.ResVal.map((data: number) => data);

      this.createChart3(this.ResName, this.ResVal);

      this.ResVal.forEach((e: number) => {
        this.s2 += e;
      });

      console.log(typeof this.resval);

      this.Total = [
        { name: 'Storage Site-1', Val: this.s1 },

        { name: 'Storage site-2', Val: this.s2 },
      ];

      this.TotalName = this.Total.map((data: any) => data.name);

      this.TotalVal = this.Total.map((data: any) => data.Val);

      this.createChart1(this.TotalName, this.TotalVal);
    });
  }

  createChart1(Label: any, Data: any) {
    if (!this.chartDisabled) {
      if (this.chart1) {
        this.chart1.destroy();
      }

      this.chart1 = new Chart('MyChart-1', {
        type: 'pie',

        data: {
          datasets: [
            {
              label: Label,
              data: Data,
              backgroundColor: ['#E6B056', '#DD2CC7'],
            },
          ],
        },
      });
    }
  }

  createChart2(Label: any, Data: any) {
    if (!this.chartDisabled) {
      if (this.chart2) {
        this.chart2.destroy();
      }

      this.chart2 = new Chart('MyChart-2', {
        type: 'pie',

        data: {
          datasets: [
            {
              label: Label,
              data: Data,
              backgroundColor: ['#B49566', '#DD2CC7', '#DD887C', '#4CA2A8'],
            },
          ],
        },
      });
    }
  }

  createChart3(Label: any, Data: any) {
    if (!this.chartDisabled) {
      if (this.chart3) {
        this.chart3.destroy();
      }

      this.chart3 = new Chart('MyChart-3', {
        type: 'pie',

        data: {
          datasets: [
            {
              label: Label,
              data: Data,
              backgroundColor: ['#666EB4', '#AF74B9'],
            },
          ],
        },
      });
    }
  }

  editButtonClicked1() {
    this.Wflag = !this.Wflag;
    this.editflag1 = !this.editflag1;
    this.chartDisabled = !this.chartDisabled;

    if (this.Wflag) {
      this.Wb1 = 'Save';
    } else {
      this.Wb1 = 'Edit';
      this.createChart2(this.WellsName, this.WellsVal);
      this.s1 = 0;

      this.WellsVal.forEach((num: any) => (this.s1 += num));

      try {
        for (let i = 0; i < 4; i++) {
          this.http
            .put(
              `http://localhost:8000/postWell/${this.WellsVal[i]}/${this.WellsName[i]}`,
              {},
              { responseType: 'text' }
            )
            .subscribe((data: any) => console.log(data));
          console.log('Sent', this.WellsVal[i]);
        }
      } catch (err) {
        console.log(err);
      }

      this.Total = [
        { name: 'Storage Site-1', Val: this.s1 },

        { name: 'Storage Site-2', Val: this.s2 },
      ];

      this.TotalName = this.Total.map((data: any) => data.name);

      this.TotalVal = this.Total.map((data: any) => data.Val);

      this.createChart1(this.TotalName, this.TotalVal);
    }
  }

  editButtonClicked2() {
    this.Rflag = !this.Rflag;
    this.editflag2 = !this.editflag2;
    this.chartDisabled = !this.chartDisabled;

    if (this.Rflag) {
      this.Rb1 = 'Save';
    } else {
      this.Rb1 = 'Edit';
      this.createChart3(this.ResName, this.ResVal);

      this.s2 = 0;

      this.ResVal.forEach((num: any) => (this.s2 += num));

      this.Total = [
        { name: 'Storage  Site-1', Val: this.s1 },

        { name: 'Storage Site-2', Val: this.s2 },
      ];

      this.TotalName = this.Total.map((data: any) => data.name);

      this.TotalVal = this.Total.map((data: any) => data.Val);

      this.createChart1(this.TotalName, this.TotalVal);

      this.resval = this.ResVal.map((data: number) => data);

      try {
       
          // console.log(this.resname[i], this.resval[i]);
          this.http.put(`http://localhost:8000/postRes/${this.resval[0]}/Reservoir 1`,{},{responseType:'text'}).subscribe((data: any) => console.log(data));
          this.http.put(`http://localhost:8000/postRes/${this.resval[1]}/Reservoir 2`,{},{responseType:'text'}).subscribe((data: any) => console.log(data));
        
     
        
      } catch (err) {
        console.log(err);
      }
    }
  }

  // applyChange() {
  //   this.WellsVal = this.Wells.map((data: any) => Number(data.wval));

  //   this.ResVal = this.Res.map((data: any) => Number(data.resval));

  //   this.createChart2(this.WellsName, this.WellsVal);

  //   this.createChart3(this.ResName, this.ResVal);

  //   this.s1 = this.s2 = 0;

  //   this.WellsVal.forEach((num: any) => (this.s1 += num));

  //   this.ResVal.forEach((num: any) => (this.s2 += num));

  //   this.Total = [
  //     { name: 'Site-1', Val: this.s1 },

  //     { name: 'Site-2', Val: this.s2 },
  //   ];

  //   this.TotalName = this.Total.map((data: any) => data.name);

  //   this.TotalVal = this.Total.map((data: any) => data.Val);

  //   this.createChart1(this.TotalName, this.TotalVal);
  // }

  checkInputValue1(value: any, index: any) {
    const parsedValue = parseInt(value);
    if (parsedValue < 0) {
 
      this.WellsVal[index] = 1;
    } else {
      this.WellsVal[index] = parsedValue;
    }
  }

  checkInputValue2(value: any, index: number) {
    const parsedValue = parseInt(value);
    if (parsedValue < 0) {

      this.ResVal[index] = 1;
    } else {
      this.ResVal[index] = parsedValue;
    }
  }
}
