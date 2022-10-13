import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class CustomLoggerService implements LoggerService {
    log(message: any, ...optionalParams: any[]) {
        console.log(message)
    }

    error(message: any, ...optionalParams: any[]) {}
  
    warn(message: any, ...optionalParams: any[]) {}
  
    debug?(message: any, ...optionalParams: any[]) {}
  
    verbose?(message: any, ...optionalParams: any[]) {}
}
