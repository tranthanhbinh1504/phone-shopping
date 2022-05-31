import { Observable } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { ShopService } from './shop.service'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  listItem: any

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getListItem()
  }

  public getListItem() {
    this.shopService.getListItems().subscribe((res: any) => {
      if (res) {
        this.listItem = res
      }
    })
  }
}
