import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemsService {
    private items: string[] = [];

    findAll(): string[] {
        return this.items;

    }

    

    create(item: string) {
        if(JSON.parse(item).del == 'y') {
            this.items.splice(0, 1);
        }
        else {
            this.items.push(item);
        }
        
    }



}
