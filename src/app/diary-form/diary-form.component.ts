import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DiaryDataService } from '../shared/dairy-data.component';
import { DiaryEntry } from '../shared/dairy-entry.module';

@Component({
  selector: 'app-diary-form',
  templateUrl: './diary-form.component.html',
  styleUrl: './diary-form.component.css',
})
export class DiaryFormComponent {
  diaryForm: FormGroup;
  editMode = false;
  diaryEntry: DiaryEntry;
  paramId: number;

  constructor(
    private diaryDataServices: DiaryDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (paramMap.has('id')) {
        this.editMode = true;
        this.paramId = +paramMap.get('id')!;
        this.diaryEntry = this.diaryDataServices.getDiaryEntry(this.paramId);
      } else {
        this.editMode = false;
      }
    });
    this.diaryForm = new FormGroup({
      date: new FormControl(this.editMode ? this.diaryEntry.date : null, [
        Validators.required,
      ]),
      entry: new FormControl(this.editMode ? this.diaryEntry.entry : null, [
        Validators.required,
      ]),
    });
  }

  onSubmit() {
    const newEntry = new DiaryEntry(1,
      this.diaryForm.value.date,
      this.diaryForm.value.entry
    );
    if (this.editMode) {
      this.diaryDataServices.onUpdateEntry(this.paramId, newEntry);
    } else {
      this.diaryDataServices.onAddDiaryEntry(newEntry);
    }
    this.router.navigateByUrl('');
  }
}
