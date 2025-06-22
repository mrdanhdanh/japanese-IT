import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-baseitem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './baseitem.component.html',
  styleUrls: ['./baseitem.component.css']
})
export class BaseitemComponent {
  @Input() comp: any;
}