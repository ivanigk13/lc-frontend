import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClick(event) : void {
      this.router.navigateByUrl(event.items.routerLink)
  }

  onLogout() {
    localStorage.clear()
    this.router.navigateByUrl('/login')
  }

  items =[
    { label: 'Activity', routerLink: '/activity/add' },
    { label: 'Login', routerLink: '/login' },    
  ]

}
