class WebSocketService {
    private static instance: WebSocketService | null = null;
    private socket: WebSocket;
    private listeners: ((message: any) => void)[]; // Listeners that are callbacks for message events
    private url: string;
  
    constructor(url: string) {
      if (WebSocketService.instance) {
        return WebSocketService.instance;
      }
      this.url = url;
      this.socket = new WebSocket(this.url);
      this.listeners = [];
      this.socket.onmessage = (event: MessageEvent) => {
        const message = JSON.parse(event.data);
        this.notifyListeners(message); // Notify all registered listeners
      };
  
      WebSocketService.instance = this;
    }
  
    public sendMessage(message: object): void {
      this.socket.send(JSON.stringify(message)); // Send the message as a JSON string
    }
  
    // Add a listener (callback function)
    public addListener(callback: (message: any) => void): void {
      this.listeners.push(callback); // Add the listener to the listeners array
    }
  
    // Remove a listener (callback function)
    public removeListener(callback: (message: any) => void): void {
      this.listeners = this.listeners.filter((listener) => listener !== callback); // Remove the listener
    }
  
    private notifyListeners(message: any): void {
      this.listeners.forEach((listener) => listener(message)); // Call each listener with the message
    }
  }
  export default WebSocketService;
  