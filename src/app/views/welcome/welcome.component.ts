import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getUrl() {
    return "url('https://mocah.org/uploads/posts/340007-Landscape-Minimalist-Minimalism-Nature-Mountain-Art-Digital-Art.jpg')";
  }
}
