import { Component, OnInit } from '@angular/core';
import { DiaryDataService } from '../shared/dairy-data.component';
import { DiaryEntry } from '../shared/dairy-entry.module';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrl: './diary.component.css',
})
export class DiaryComponent implements OnInit {
  diaryEntries: DiaryEntry[];
  diarySubscription = new Subscription();

  constructor(private diaryDataService: DiaryDataService, private router: Router) {}

  ngOnInit(): void {
    this.diarySubscription = this.diaryDataService.diarySubject.subscribe(diaryEntries=>{
      this.diaryEntries = this.diaryDataService.diaryEntries;
    })
    this.diaryEntries = this.diaryDataService.diaryEntries;
  }

  ngOndestroy(): void{
    this.diarySubscription.unsubscribe();
  }

  onDelete(index: number) {
    this.diaryDataService.onDelete(index);
  }

  onEdit(index: number){
    this.router.navigate(["edit",index]);
  }

  
}
