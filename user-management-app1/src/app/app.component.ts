import { Component } from '@angular/core';
import { UserService } from './user.service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user-management-app';
  filters: any = {};


  constructor(private userService: UserService) {}
  
  ngOnInit(): void {
    // Fetch initial user data or perform any initialization
    // For example:
    this.applyFilters({});
  }
  
  applyFilters(filters: any) {
    this.filters = filters;
  }
}