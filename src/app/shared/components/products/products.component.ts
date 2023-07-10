import { Component, EventEmitter, Input, Output } from '@angular/core';

import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
} from 'src/app/models/product.model';

import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  @Input() products: Product[] = [];

  @Output() loadMore = new EventEmitter();
  myShoppingCart: Product[] = [];
  total = 0;
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

  @Input() set productId(id: string | null) {
    if (id) {
      this.onShowDetail(id);
    }
  }

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
    register();
  }

  public onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  public toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  public onShowDetail(id: string) {
    if (!this.showProductDetail) this.toggleProductDetail();
    this.productsService.getProductByID(id).subscribe((data) => {
      this.productChosen = data;
    });
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

  public onLoadMore() {
    this.loadMore.emit();
  }
}
