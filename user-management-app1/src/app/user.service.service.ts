import { Injectable } from '@angular/core';
import { USERS } from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users = USERS;

  constructor() { }

  // Method to fetch all users
  getUsers(): any[] {
    return this.users;
  }

  // Method to extract unique domains from user data
  getUniqueDomains(): string[] {
    const domainsSet = new Set<string>();
    this.users.forEach(user => domainsSet.add(user.domain));
    return Array.from(domainsSet);
  }
}
