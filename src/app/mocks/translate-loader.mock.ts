import { TranslateLoader } from "@ngx-translate/core";
import { Observable, of } from "rxjs";

let translations: any = { 'KEY': 'Value' };

export class TranslateLoaderMock implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
      return of(translations);
    }
}