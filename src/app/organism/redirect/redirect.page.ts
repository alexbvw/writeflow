import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.page.html',
  styleUrls: ['./redirect.page.scss'],
})
export class RedirectPage implements OnInit {

  constructor(private router: Router,private route: ActivatedRoute, private authenticationService: AuthenticationService) { }

  async ngOnInit() {
    console.log('hello');
    await this.redirect();
  }

  async redirect(){
    this.route.queryParams.subscribe(async (params:any) => {
      console.log(params);
      if(params['code'] ){
        this.authenticationService.requestToken(params['code'])
        .then(async (res: any) => {
          console.log(res)
          localStorage.setItem('token', await res?.response?.access_token);
          await this.router.navigate(['/pulse']);
        })
        .catch((err: any) => {
          console.log(err)
        })
      }
    })
  }

}
