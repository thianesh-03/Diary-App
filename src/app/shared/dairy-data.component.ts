import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DiaryEntry } from './dairy-entry.module';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DiaryDataService {

  constructor(private http: HttpClient) {}
  public diarySubject = new Subject<DiaryEntry[]>();

  private diaryEntries: DiaryEntry[] = [];

  onDelete(index: number) {
    this.diaryEntries.splice(index, 1);
    this.diarySubject.next(this.diaryEntries);
  }

  onAddDiaryEntry(diaryEntry: DiaryEntry){
    this.diaryEntries.push(diaryEntry);
    this.diarySubject.next(this.diaryEntries);
  }
  getDiaryEntry(index:number){
    return {...this.diaryEntries[index]};
  }

  onUpdateEntry(paramId:number,newEntry:DiaryEntry){
    this.diaryEntries[paramId]=newEntry;
    this.diarySubject.next(this.diaryEntries);
  }
}
