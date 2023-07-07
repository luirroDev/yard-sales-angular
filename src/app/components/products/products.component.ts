import { Component, OnInit } from '@angular/core';

import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
} from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail = false;
  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: '',
    },
    description: '',
  };

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
    register();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  public onShowDetail(id: string) {
    this.productChosen = this.products.filter(
      (product) => product.id === id
    )[0];
    if (!this.showProductDetail) this.toggleProductDetail();
    console.log(
      'local => ',
      this.products.find((product) => product.id === id)
    );
    // this.productsService.getProductByID(id).subscribe((data) => {
    //   console.log('request => ', data);
    // });
  }

  public createNewProduct() {
    const product: CreateProductDTO = {
      title: 'New Product',
      price: 855.99,
      description: 'lo mejor del mercado, bueno, bonito y barato',
      categoryId: 2,
      images: [
        'https://images.pexels.com/photos/6347919/pexels-photo-6347919.jpeg?w=600&h=500&dpr=1',
      ],
    };

    this.productsService.create(product).subscribe((data) => {
      console.log('created', { data });
      this.products.unshift(data);
    });
  }

  public updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'producto actualizado',
    };
    const id = this.productChosen.id;
    this.productsService.update(id, changes).subscribe((data) => {
      console.log(`producto con id ${id} actualizado \n`, { data });
      const productIndex = this.products.findIndex(
        (item) => item.id === this.productChosen.id
      );
      this.products[productIndex] = data;
      this.productChosen = data;
    });
  }

  public onDeleteProduct(id: string) {
    this.productsService.delete(id).subscribe(() => {
      const productIndex = this.products.findIndex(
        (item) => item.id === this.productChosen.id
      );
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }

  // public onGetBuildings() {
  //   this.productsService.getBuildings().subscribe((data) => {
  //     console.log(data);
  //   });
  // }
}
