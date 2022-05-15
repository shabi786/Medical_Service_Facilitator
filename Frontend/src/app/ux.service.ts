import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
declare var halfmoon;
@Injectable({
  providedIn: 'root',
})
export class UxService {
  dark = JSON.parse(localStorage.getItem('dark')) || false;
  linkTag: HTMLLinkElement = document.getElementById(
    'css-main'
  ) as HTMLLinkElement;
  showToast(title: string, content: string): void {
    alert(content);
  }
  constructor(private spinner: NgxSpinnerService) {
    if (this.dark) {
      this.linkTag.href = '/assets/css/dark.css';
      document.body.classList.add('dark');
    }
  }
  startSpinner(): void {
    this.spinner.show();
  }
  stopSpinner(): void {
    this.spinner.hide();
  }
  toggleDarkMode(): void {
    this.dark = !this.dark;
    if (this.dark) {
      this.linkTag.href = '/assets/css/dark.css';
      document.body.classList.add('dark');
    } else {
      this.linkTag.href = '/assets/css/light.css';
      document.body.classList.remove('dark');
    }
    localStorage.setItem('dark', JSON.stringify(this.dark));
  }
  errHandler = (err): void => {
    this.stopSpinner();
    const message = err.message || 'Something went wrong';
    this.showToast('Error', message);
  };
}
