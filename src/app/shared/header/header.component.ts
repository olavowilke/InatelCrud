import { Component, OnInit } from '@angular/core';

@Component({
  // selector é usado para declarar o componente no html
  selector: 'app-header',
  // indica o path do template html
  templateUrl: './header.component.html',
  // indica o path da folha de estilo
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
