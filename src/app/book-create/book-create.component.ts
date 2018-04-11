import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BookCreateComponent implements OnInit {
  socket = io('http://localhost:4000');
  book: any;

  constructor(private http: HttpClient, private router: Router) {
    this.book = {
      isbn: '',
      title: '',
      author: '',
      published_year: '',
      publisher: '',
    };
  }

  ngOnInit() {
  }

  saveBook() {
    console.log(' this.book', this.book);
    this.http.post('/book', this.book)
      .subscribe(res => {
          const id = res['_id'];
          this.socket.emit('save-message', res);
          this.router.navigate(['/book-details', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
