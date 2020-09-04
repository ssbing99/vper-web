import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {UtilService} from '../../shared/services/util.service';
import {catchError, filter, tap} from 'rxjs/operators';
import {AlertService} from '../../shared/services/alert.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private utilService: UtilService,
              private alertService: AlertService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.utilService.isAssetPath(req.url)) {
      return next.handle(req);
    }

    return next.handle(req).pipe(
      filter(res => res instanceof HttpResponse),
      tap((res: any) => {
        if (res.body != null && res.body.status != null && res.body.status !== 200) {
          if (!this.EXCLUDED_API_ERROR_CHECKING.includes(req.body.method)) {
            this.alertService.presentErrorAlert(res.body.message);
          }

          return of(null);
        }
        return of(res);
      }),
      catchError((error) => {
        return throwError(this.handleError(error));
      })
    );
  }

  private handleError(error: Error) {
    if (error instanceof HttpErrorResponse) {
      this.alertService.presentErrorAlert(error.message);
      return of(null);
    }
  }

  private EXCLUDED_API_ERROR_CHECKING = [
    'UserChatGetDataByorderId'
  ];
}
