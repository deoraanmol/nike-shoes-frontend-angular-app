import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface ShoeDetails {
  shoePrice: string;
  state: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  shoeDatabase = [
    {
      shoeId: '1',
      model: 'Nike Air Max 95 SE',
      minPrice: 120,
      maxPrice: 150,
    },
    {
      shoeId: '2',
      model: 'Nike Air Max 97 SE',
      minPrice: 5,
      maxPrice: 150,
    },
    {
      shoeId: '3',
      model: 'Nike Air Max Pre-Day',
      minPrice: 120,
      maxPrice: 160,
    },
    {
      shoeId: '4',
      model: 'Nike Air Max 270',
      minPrice: 100,
      maxPrice: 130,
    },
    {
      shoeId: '5',
      model: 'Nike Renew Ride 3',
      minPrice: 180,
      maxPrice: 200,
    },
    {
      shoeId: '6',
      model: 'Nike Air Max 90',
      minPrice: 120,
      maxPrice: 150,
    },
  ];
  returnedShoeDetails = [
    {shoeId: "1", price: "0"},
    {shoeId: "2", price: "0"},
    {shoeId: "3", price: "0"},
    {shoeId: "4", price: "0"},
    {shoeId: "5", price: "0"},
    {shoeId: "6", price: "0"}
  ]
  title = 'nike-shoes-frontend-angular-app';
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.shoeDatabase.map(eachShoe => {
      this.http.get(`/api/shoe-price/${eachShoe.shoeId}`).subscribe((response) => {
        const shoeDetails = response as ShoeDetails;
        const detailsById = this.returnedShoeDetails.find(i => i.shoeId === eachShoe.shoeId);
        if (detailsById) {
          detailsById.price = shoeDetails.shoePrice;
          console.log("here: "+JSON.stringify(this.returnedShoeDetails));
        }
      })
    })
  }
  public getPrice(shoeId: string): string {
    const forShoe = this.returnedShoeDetails.find(i => i.shoeId === shoeId);
    if (forShoe) {
      return forShoe.price;
    }
    return "Not Found!";
  }
  public getState(shoeId: string): string {
    const forShoe = this.shoeDatabase.find(i => i.shoeId === shoeId);
    const givenPrice: number = +this.getPrice(shoeId);
    if (!forShoe) {
      return "Not Found!";
    }
    if (givenPrice < forShoe.minPrice) {
      return "Best time to buy!";
    } else if (givenPrice > forShoe.maxPrice) {
      return "Can wait for discount";
    } else {
      return "Moderate state, can buy now!";
    }
  }
}
