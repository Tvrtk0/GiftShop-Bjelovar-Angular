import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-model',
  templateUrl: './info-model.component.html',
  styleUrls: ['./info-model.component.scss']
})
export class InfoModelComponent implements OnInit {

  isVisited: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  test() {
    this.isVisited = !this.isVisited;
  }

  close() {
    this.isVisited = !this.isVisited;
  }
 
}
