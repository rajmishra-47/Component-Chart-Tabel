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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,FormsModule,MatButtonModule,MatDividerModule,MatFormFieldModule,MatIconModule,MatInputModule,MatSelectModule,MatTableModule,HttpClientModule,ReactiveFormsModule,ComponentDropDownComponent,Component3Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tt';
  clickEvent:Subscription

  constructor(private http: HttpClient,private sharedService:SharedService,  ) {
    this.clickEvent=this.sharedService.getEvent().subscribe(()=>{
      this.applyChange()
    })
    
  }

  a: number = 0;
  b: number = 0;

  Wells: any;
  WellsName: any;
  WellsVal: any;

  Res: any;
  ResName: any;
  ResVal: any=[];

  TotalName: any ;
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

  s1=0
  s2=0

  Total:any


  resname=['Reserviour-1','Reserviour-2']

  onRowClicked(dummy: any) {}

  displayedColumns: string[] = ['lable', 'num'];

  ngOnInit() {

    console.log("Hello");
    
    this.http.get('http://localhost:8000/showWell').subscribe((data: any) => {
      this.Wells = data;

      this.WellsName = this.Wells.map((data: any) => data.wname);

      this.WellsVal = this.Wells.map((data: any) => Number(data.wval));

      this.createChart2(this.WellsName, this.WellsVal);
      // this.createChart1(this.WellsName,this.WellsVal);
      // this.createChart3(this.WellsName,this.WellsVal);



    });
    
    this.http.get('http://localhost:8000/showRes').subscribe((data: any) => {
      this.Res = data;
      this.ResName = this.Res.map((data: any) => data.resName);
      this.ResVal = this.Res.map((data: any) => Number(data.resval));

      console.log(this.ResName);
      

      this.createChart3(this.ResName, this.ResVal);

      this.ResVal.forEach((e:number) => {
        this.s2+=e
      });

      this.s1=100



      this.Total=[ {name:'Storage Site-1',Val:this.s1},

                    {name:"Storage site-2",Val:this.s2}]



      this.TotalName=this.Total.map((data:any)=>data.name)


      this.TotalVal=this.Total.map((data:any)=>data.Val)

      this.createChart1(this.TotalName,this.TotalVal)

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
    } 
    
    else
     {

      this.Wb1 = 'Edit';
      this.createChart2(this.WellsName,this.WellsVal)
      this.s1=0

    this.WellsVal.forEach((num:any)=> this.s1+=num)

  
    this.Total=[ {name:'Site-1',Val:this.s1},

                  {name:"Site-2",Val:this.s2}]


    this.TotalName=this.Total.map((data:any)=>data.name)

    this.TotalVal=this.Total.map((data:any)=>data.Val)



    this.createChart1(this.TotalName,this.TotalVal)
    }

      
    
  }

  editButtonClicked2() {
    
    this.Rflag = !this.Rflag;
    this.editflag2 = !this.editflag2;
    this.chartDisabled = !this.chartDisabled;

    if (this.Rflag) {
      this.Rb1 = 'Save';
     
    } 
    
      else 
    {
      this.Rb1 = 'Edit'
      this.createChart3(this.ResName,this.ResVal)

      this.s2=0


    this.ResVal.forEach((num:any)=> this.s2+=num)


    this.Total=[ {name:'Site-1',Val:this.s1},

                  {name:"Site-2",Val:this.s2}]


    this.TotalName=this.Total.map((data:any)=>data.name)

    this.TotalVal=this.Total.map((data:any)=>data.Val)

    this.createChart1(this.TotalName,this.TotalVal)
    
  }
  
}





  applyChange() {
    this.WellsVal = this.Wells.map((data: any) => Number(data.wval));

    this.ResVal = this.Res.map((data: any) => Number(data.resval));

    this.createChart2(this.WellsName, this.WellsVal);

    this.createChart3(this.ResName, this.ResVal);

    this.s1=this.s2=0

    this.WellsVal.forEach((num:any)=> this.s1+=num)

    this.ResVal.forEach((num:any)=> this.s2+=num)


    this.Total=[ {name:'Site-1',Val:this.s1},

                  {name:"Site-2",Val:this.s2}]


    this.TotalName=this.Total.map((data:any)=>data.name)

    this.TotalVal=this.Total.map((data:any)=>data.Val)

    this.createChart1(this.TotalName,this.TotalVal)

 
  }


  checkInputValue1(value: any, index: any) {
    const parsedValue = parseInt(value);
    if (parsedValue < 0) {
      // Assuming you want to reset to 1 if the input is negative
      this.WellsVal[index] = 1;
    } else {
      this.WellsVal[index]= parsedValue;
    }
  }


  checkInputValue2(value: any, index: number) {
    const parsedValue = parseInt(value);
    if (parsedValue < 0) {
      // Assuming you want to reset to 1 if the input is negative
      this.ResVal[index]= 1;
    } else {
      this.ResVal[index] = parsedValue;
    }
  }

}
