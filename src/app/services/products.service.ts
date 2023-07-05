import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
} from './../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  private API_URL = 'https://young-sands-07814.herokuapp.com/api/products';

  public getAllProducts() {
    return this.http.get<Product[]>(this.API_URL);
  }

  public getProductByID(id: string) {
    return this.http.get<Product>(`${this.API_URL}/${id}`);
  }

  public create(data: CreateProductDTO) {
    return this.http.post<Product>(this.API_URL, data);
  }

  public update(id: string, data: UpdateProductDTO) {
    return this.http.put<Product>(`${this.API_URL}/${id}`, data);
  }

  public delete(id: string) {
    return this.http.delete<boolean>(`${this.API_URL}/${id}`);
  }
}
