import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-error-view',
  templateUrl: './error-view.component.html',
  styleUrls: ['./error-view.component.css']
})
export class ErrorViewComponent implements OnInit {
  constructor(private renderer: Renderer2) {
    this.renderer.setStyle(document.body, 'background', 'white');
  }

  ngOnInit() {}
}
