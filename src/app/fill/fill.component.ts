import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {QuizService} from '../quiz.service'

@Component({
  selector: 'app-fill',
  templateUrl: './fill.component.html',
  styleUrls: ['./fill.component.scss']
})
export class FillComponent implements OnInit {
  duration=300;
  correctAnswer=0;
  answers=[];
  qns=[];
  qId:number;
  timeEllapsed='00:00';
  startTime: Date;
  timer: any = null;
  timeLeft: number = 30;
  interval ;


  constructor(private _formBuilder: FormBuilder,  public quizService: QuizService) { }

  ngOnInit(): void {
    this.timer = setInterval(() => { this.tick(); }, 1000);
    this.startTime = new Date();
    this.timeEllapsed = '00:00';
  }


  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  startTimer() {
    this.quizService.timer = setInterval(() => {
      this.quizService.seconds++;
      localStorage.setItem('seconds', this.quizService.seconds.toString());
    }, 1000);
  }

  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.duration) {
      this.submit();
    }
    this.timeEllapsed = this.parseTime(diff);
  }

 
  left() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } 
      else {
        this.timeLeft = 30;
      }
    }, 1000);
  }

  changeRadio(event){
    this.answers.push(event.target.value);

  }

  Answer( choice) {
    this.quizService.qns[this.quizService.qnProgress].answer = choice;
    this.quizService.qnProgress++;
    localStorage.setItem('qnProgress', this.quizService.qnProgress.toString());
    if (this.quizService.qnProgress == 10) {
      clearInterval(this.quizService.timer);
    }
  }
    submit(){
      alert("Thank you")
    }

    getAnswer(){
      var body= this.qns.map(x=>x.answer);
      
    }
  

  
}
