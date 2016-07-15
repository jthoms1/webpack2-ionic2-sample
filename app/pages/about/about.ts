import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import './about.scss';

@Component({
  templateUrl: 'build/pages/about/about.html'
})
export class AboutPage {
  constructor(private navController: NavController) {
  }
}
