import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {LoadingService} from "../services/loading.service";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.progressBarLoadingState.next(true);
    console.log(this.loadingService.progressBarLoadingState.value);
    const modifiedReq = request.clone({
      headers: request.headers.set('token', 'snfjg85YY39475fhestdgff'),
    });
    return next.handle(modifiedReq).pipe(finalize(() => {
      this.loadingService.progressBarLoadingState.next(false);
    }));
  }
}
