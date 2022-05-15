import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UxService } from '../../ux.service';
import { AuthService } from '../../auth.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {
  skills: string[] = [];
  diseases: string[] = [];
  dropdownSettings: IDropdownSettings = {};
  constructor(
    private http: HttpClient,
    private ux: UxService,
    private auth: AuthService
  ) {
    this.getSkills();
    this.diseases = [
      'Fungal infection',
      'Allergy',
      'GERD',
      'Chronic cholestasis',
      'Drug Reaction',
      'Peptic ulcer disease',
      'AIDS',
      'Diabetes',
      'Gastroenteritis',
      'Bronchial Asthma',
      'Hypertension',
      ' Migraine',
      'Cervical spondylosis',
      'Paralysis (brain hemorrhage)',
      'Jaundice',
      'Malaria',
      'Chicken pox',
      'Dengue',
      'Typhoid',
      'hepatitis A',
      'Hepatitis B',
      'Hepatitis C',
      'Hepatitis D',
      'Hepatitis E',
      'Alcoholic hepatitis',
      'Tuberculosis',
      'Common Cold',
      'Pneumonia',
      'Dimorphic hemorrhoids(piles)',
      'Heart Attack',
      'Varicose Veins',
      'Hypothyroidism',
      'Hyperthyroidism',
      'Hypoglycemia',
      'Osteoarthritis',
      'Arthritis',
      '(vertigo) Paroxysmal  Positional Vertigo',
      'Acne',
      'Urinary tract infection',
      'Psoriasis',
      'Impetigo',
    ];
    this.dropdownSettings = {
      singleSelection: false,
      itemsShowLimit: 5,
    };
  }
  getSkills(): void {
    this.ux.startSpinner();
    this.http
      .get(`${this.auth.baseURL}/skills`, {
        headers: { Authorization: `Bearer ${this.auth.token}` },
      })
      .subscribe((res: any) => {
        this.ux.stopSpinner();
        if (res.success) {
          this.skills = res.skills;
        } else {
          this.ux.showToast('Error', res.message);
        }
      }, this.ux.errHandler);
  }
  updateSkills(): void {
    this.ux.startSpinner();
    console.log(this.skills);
    this.http
      .post(
        `${this.auth.baseURL}/skills`,
        { skills: this.skills.join(',') },
        {
          headers: { Authorization: `Bearer ${this.auth.token}` },
        }
      )
      .subscribe((res: any) => {
        this.ux.stopSpinner();
        if (res.success) {
          this.ux.showToast('Success', 'Skills saved');
          this.skills = res.skills;
        } else {
          this.ux.showToast('Error', res.message);
        }
      }, this.ux.errHandler);
  }
  ngOnInit(): void {}
}
