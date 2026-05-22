import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
@Component({
    selector: 'app-root',
    imports: [ RouterOutlet ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
        // 強制滾動到最上方
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0; // Safari 相容
        window.scrollTo(0, 0);
      });
    }
  }


}
