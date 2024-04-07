import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../user.service.service';

@Component({
  selector: 'app-user-filters',
  templateUrl: './user-filters.component.html',
  styleUrls: ['./user-filters.component.css']
})
export class UserFiltersComponent implements OnInit {
  uniqueDomains: string[] = [];
  selectedDomain: string = '';
  selectedGender: string = '';
  selectedAvailability: string = '';

  @Output() filtersApplied: EventEmitter<any> = new EventEmitter();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.uniqueDomains = this.userService.getUniqueDomains();
  }

  applyFilters() {
    const filters = {
      domain: this.selectedDomain,
      gender: this.selectedGender,
      availability: this.selectedAvailability
    };
    this.filtersApplied.emit(filters);
  }

  applyAllFilters() {
    const filters = {
      domain: this.selectedDomain,
      gender: this.selectedGender,
      availability: this.selectedAvailability
    };
    this.filtersApplied.emit(filters);
  }
}