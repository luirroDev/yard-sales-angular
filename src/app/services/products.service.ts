import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
} from './../models/product.model';
import { checkTime } from '../interceptors/time.interceptor';
import { map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  private API_URL = 'https://damp-spire-59848.herokuapp.com/api';

  public getAll(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', limit);
    }
    return this.http
      .get<Product[]>(`${this.API_URL}/products`, {
        params,
        context: checkTime(),
      })
      .pipe(
        retry(3),
        map((products) =>
          products.map((item) => {
            return {
              ...item,
              taxes: 0.19 * item.price,
            };
          })
        )
      );
  }

  public getByCategory(categoryId: string, limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', limit);
    }
    return this.http.get<Product[]>(
      `${this.API_URL}/categories/${categoryId}/products`,
      { params }
    );
  }

  public getProductByID(id: string) {
    return this.http.get<Product>(`${this.API_URL}/products/${id}`);
  }

  public create(data: CreateProductDTO) {
    return this.http.post<Product>(`${this.API_URL}/products`, data);
  }

  public update(id: string, data: UpdateProductDTO) {
    return this.http.put<Product>(`${this.API_URL}/products/${id}`, data);
  }

  public delete(id: string) {
    return this.http.delete<boolean>(`${this.API_URL}/products/${id}`);
  }
}
