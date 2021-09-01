import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData: any;
  messsaje: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.messsaje = '';
    this.loginData = {};
  }

  ngOnInit(): void {}
  login() {
    if (
      !this.loginData.email ||
      !this.loginData.password
    ) {
      console.log('failed process : Incomlete data');
      this.messsaje = 'failed process : Incomlete data';
      this.opneSnackBarError();
      this.loginData = {};
    } else {
      this._userService.login(this.loginData).subscribe(
        (res) => {
          console.log(res);
          localStorage.setItem('token', res.jwtToken);
          this._router.navigate(['/listTask']);
          this.loginData={}
        },
        (err) => {
          console.log(err);
          this.messsaje = err.error;
          this.opneSnackBarError();
        }
      );
    }
  }

  opneSnackBarError() {
    this._snackBar.open(this.messsaje, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass:['style-snackBarFalse']
    });
  }
}
