import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUser = {
    userName:"",
    password: "",
    password2:""
  }
  warning: any;
  success: Boolean = false;
  loading: Boolean = false;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {

  }
  onSubmit(){
    if(this.registerUser.userName != "" && this.registerUser.password === this.registerUser.password2)
    {
      this.loading = true;
      this.auth.register(this.registerUser).subscribe(
        (success) =>{
          this.success = true;
          this.warning = null;
          this.loading = false;
        },
        (err)=>{
          this.warning  = err.error.message;
          this.success = false;
          this.loading = false;
        }
      );
    }
  }
}
