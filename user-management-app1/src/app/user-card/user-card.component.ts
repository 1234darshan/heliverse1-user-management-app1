import { Component, Input, OnInit } from '@angular/core';
import { USERS } from '../mock-data';

// Define the Team interface
interface Team {
  name: string;
  leader: string;
  members: any[]; // Array to store team members
}

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() filters: any; // Input property to receive filters from the parent component

  users = USERS; // Array containing user data
  filteredUsers: any[] = []; // Array to store users after filtering
  currentPage = 1; // Current page number for pagination
  usersPerPage = 20; // Number of users to display per page
  searchText: string = ''; // Search text entered by the user
  selectedUsers: any[] = []; // Array to store selected users
  createdTeam: Team | null = null; // Object to store the created team, initially set to null

  // Getter method to paginate the filtered users
  
  get paginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.usersPerPage;
    const endIndex = startIndex + this.usersPerPage;
    return this.filteredUsers.slice(startIndex, endIndex);
  }

  constructor() {}

  ngOnInit(): void {
    this.filteredUsers = this.users; // Initialize filteredUsers array with all users
  }

  ngOnChanges(changes: { [propName: string]: import("@angular/core").SimpleChange }): void {
    if (changes['filters']) {
      this.applyFilters(this.filters); // Pass filters as an argument to applyFilters()
    }
  }
  
  

// Method to handle search input
onSearch(searchText: string) {
  this.searchText = searchText.trim().toLowerCase(); // Update searchText (trim and convert to lowercase)
  this.currentPage = 1; // Reset currentPage to first page
  this.applyFilters(this.filters); // Apply filters including the search filter
}


  // Method to apply filters
  applyFilters(filters: any) {
    console.log('apply filters from the user component');
    
    this.filteredUsers = this.users.filter(user => {
      // Apply search filter
      if (this.searchText && !user.first_name.toLowerCase().includes(this.searchText) && !user.last_name.toLowerCase().includes(this.searchText)) {
        return false;
      }
      // Apply other filters
      if (filters && filters.domain && user.domain !== filters.domain) return false;
      if (filters && filters.gender && user.gender !== filters.gender) return false;
      if (filters && filters.availability && user.available.toString() !== filters.availability) return false;
      return true;
    });
  }
  
  // Method to toggle user selection
  toggleSelection(user: any) {
    console.log('User:', user); // Check the user object
    const isChecked = this.selectedUsers.includes(user); // Check if user is already selected
    console.log('isChecked:', isChecked); // Check the value of isChecked
    if (!isChecked) {
      console.log('user.available:', user.available); // Check the value of user.available
      if (!user.available) {
        alert(`${user.first_name} ${user.last_name} is not available.`);
      } else {
        this.selectedUsers.push(user);
      }
    } else {
      this.selectedUsers = this.selectedUsers.filter(selectedUser => selectedUser !== user);
    }

    // Reset the checkbox if it's already checked
    const checkboxElement = document.querySelector(`input[type="checkbox"][value="${user.id}"]`) as HTMLInputElement;
    if (checkboxElement.checked) {
      checkboxElement.checked = false;
    }
  }

  // Method to determine if a user is selectable (meets criteria for selection)
  isSelectable(user: any): boolean {
    // Check if the user's domain is unique among the selected users
    const uniqueDomain = this.selectedUsers.every(selectedUser => selectedUser.domain !== user.domain);
    // Check if the user is available
    const isAvailable = user.available;

    return uniqueDomain && isAvailable;
  }

  // Method to create a team
  createTeam() {
    const teamName = "New Team"; // You can set a custom team name here
    const teamLeader = "Team Leader"; // You can set the team leader's name here
    this.createdTeam = {
      name: teamName,
      leader: teamLeader,
      members: this.selectedUsers // Set the selected users as members of the created team
    };
    this.selectedUsers = []; // Clear the array of selected users after creating the team
  }

  // Method to remove a member from the created team
  removeMember(member: any) {
    if (this.createdTeam !== null) {
      // Check if the createdTeam object is not null
      this.createdTeam.members = this.createdTeam.members.filter(m => m !== member); // Remove the member from the team
      alert(`Member ${member.first_name} ${member.last_name} has been removed from the team.`);
    }
  }  
}