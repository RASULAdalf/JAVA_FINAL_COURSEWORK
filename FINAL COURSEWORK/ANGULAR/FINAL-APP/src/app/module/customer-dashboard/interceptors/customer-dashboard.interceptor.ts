import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {LoadingService} from "../services/loading.service";

@Injectable()
export class CustomerDashboardInterceptor implements HttpInterceptor {

  constructor(private loadingService:LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.progrssBarLoadingState.next(true);
    const modifiedReq = request.clone({
      headers: request.headers.set('token','snfjg85YY39475fhestdgff'),
    });
    return next.handle(modifiedReq).pipe(finalize(()=> {this.loadingService.progrssBarLoadingState.next(false);}));
  }
}
