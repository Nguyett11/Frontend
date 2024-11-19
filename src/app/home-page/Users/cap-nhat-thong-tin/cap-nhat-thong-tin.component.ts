import { Component, OnInit } from '@angular/core';
import { User } from '../../../Models/users';
import { ActivatedRoute, Router } from '@angular/router';
import { userService } from '../../../Service/userService';

@Component({
  selector: 'app-cap-nhat-thong-tin',
  templateUrl: './cap-nhat-thong-tin.component.html',
  styleUrls: ['./cap-nhat-thong-tin.component.css']
})
export class CapNhatThongTinComponent implements OnInit {
  user: User = new User();
  selected: any = null;
  user_id: number;
  username: string;
  email: string;
  phone:string;
  address: string;


  constructor(
    private route: ActivatedRoute,
    private userServices: userService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('1'); // Ensure this matches the route parameter for the user ID
     // Retrieve existing user data and bind to the form
     this.userServices.getUserById(1).subscribe(
      (data: User) => {
        this.user = data; // Bind the existing data to the user object
      },
      (error) => {
        console.error('Error fetching user:', error);
        alert('Unable to fetch user data. Please try again later.');
      }
    );
  }

  // updateUser(): void {
  //   this.userServices.updateUser(this.user.user_id, this.user).subscribe(
  //     () => {
  //       alert('User updated successfully!');
  //     },
  //     (error) => {
  //       console.error('Error updating user:', error);
  //     }
  //   );
  // }

  updateUser(): void {
    // Call the service method to update user data
    this.userServices.updateUser(this.user.user_id, this.user).subscribe(
      () => {
        alert('User updated successfully!');
        this.router.navigate(['/user-list']); // Navigate to a different route after successful update
      },
      (error) => {
        console.error('Error updating user:', error);
        alert('Error updating user. Please try again.');
      }
    );
  }
}
