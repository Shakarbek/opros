import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  answer: number;
  qId:number;
  qns:number;
  // q_ans=new Map<number, number>() ;
  
  seconds:number;
  timer;
  qnProgress: number;
  correctAnswerCount: number = 0;
  
  constructor() { }

  displayTimeElapsed() {
    return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
  }
}
