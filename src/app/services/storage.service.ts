import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  

    public saveData(key: string, value: string): void{
        localStorage.setItem(key, value);
    }

    public getData(key: string): string | null{
        return localStorage.getItem(key);
    }

    public clearStorage(): void{
        localStorage.clear();
    }
    public removeItem(key: string): void{
        localStorage.removeItem(key)
    }
    

}
