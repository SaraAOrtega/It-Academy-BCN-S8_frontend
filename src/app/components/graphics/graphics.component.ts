import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart} from 'chart.js/auto';
import { GraphicsService } from './../../services/graphics.service';

@Component({
  selector: 'app-graphics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css'],
})
export class GraphicsComponent implements OnInit, AfterViewInit {
  @ViewChild('pieChartCanvas') pieChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barChartCanvas') barChartCanvas!: ElementRef<HTMLCanvasElement>;

  private pieColors: string[] = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
    '#FF9F40', '#FF6384', '#C9CBCF', '#4BC0C0', '#FF9F40'
  ];

  private barColorsMap: Record<string, string> = {
    'jefe de producción': '#FF6384',
    'asistente de producción': '#FF6384',
    'director de arte': '#FFCE56',
    'asistente de arte': '#FFCE56',
    'jefe de locaciones': '#4BC0C0',
    'asistente de locaciones': '#4BC0C0',
    'director': '#9966FF',
    'asistente de dirección': '#9966FF',
    'asistente de vestuario': '#36A2EB',
    'vestuarista': '#36A2EB',
    
  };

  private defaultBarColor: string = '#CCCCCC'; 

  constructor(private graphicsService: GraphicsService) {}

  ngOnInit() {
    this.loadChartData();
  }

  ngAfterViewInit() {
    
  }

  private loadChartData() {
    this.graphicsService.getEmployeesByTeam().subscribe({
      next: (teamData) => this.createPieChart(teamData),
      error: (error) => console.error('Error loading team data:', error)
    });

    this.graphicsService.getEmployeesByCategory().subscribe({
      next: (categoryData) => this.createBarChart(categoryData),
      error: (error) => console.error('Error loading category data:', error)
    });
  }

  private createPieChart(data: Record<string, number>) {
    const ctx = this.pieChartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: Object.keys(data),
          datasets: [{
            data: Object.values(data),
            backgroundColor: this.pieColors.slice(0, Object.keys(data).length),
            label: 'Empleados por Equipo',
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Empleados por Equipo',
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      });
    }
  }

  private createBarChart(data: Record<string, number>) {
    const ctx = this.barChartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      const labels = Object.keys(data);
      const backgroundColor = labels.map(label => 
        this.barColorsMap[label] || this.defaultBarColor
      );

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            data: Object.values(data),
            backgroundColor: backgroundColor,
            label: 'Empleados por Categoría',
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Empleados por Categoría',
            },
            legend: {
              display: false, 
            },
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        },
      });
    }
  }
}