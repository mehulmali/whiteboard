import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  books: any;
  socket = io('http://localhost:4000');
  demoText: string;

  constructor(private http: HttpClient) {
    this.books = [];
    this.demoText = '';
  }

  eventHandler(demoText) {
    this.socket.emit('write', demoText);
  }

  ngOnInit() {
    this.socket.on('new-message', function (data) {
      console.log('data----', data);
      this.books.push(data);
    }.bind(this));
    this.http.get('/book').subscribe(data => {
      this.books = data;
    });

    this.socket.on('newWrite', function (data) {
      console.log('working', data);
      this.demoText = data;
    }.bind(this));
  }
}
