import { Injectable } from '@nestjs/common';
import { toJalaali } from 'jalaali-js';

@Injectable()
export class DateService {
  
  convertTimestampToPersian(timestamp: number): string {
     
    const dateObj = new Date(timestamp);

    const jalaali = toJalaali(dateObj);

    return `${jalaali.jy}/${jalaali.jm}/${jalaali.jd}`;
  }

  //پیاده سازی برعکس همین تایم 
  //پیاده سازی تایم با ثانیه 


}