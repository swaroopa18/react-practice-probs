/* 
I have implemented the Singleton design pattern for the Logger class.
private :- A private member is only accessible within the class and not accessible from outside the class.
static variable:- Static properties belong to the class itself and not to its instances. ex:- Logger.instance but not logger1.instance
*/
class Logger {
    private static instance: Logger; //Static properties belong to the class itself and not to its instances.
    private logs: string[] = [];
    constructor() {
      if (Logger.instance) {
        return Logger.instance;
      }
      Logger.instance = this;
      this.logs = [];
    }
  
    log(message: string) {
      this.logs.push(message);
      console.log(message);
    }
  
    getLogs(): string[] {
      return this.logs;
    }
  }
  
  export default Logger;
  