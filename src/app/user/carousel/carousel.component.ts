import { Component, OnInit, Input } from '@angular/core';
import { Image } from '../../_model/image.model';

declare var $: any;

@Component({
    selector: "carousel",
    templateUrl: './carousel.component.html'
})

export class CarouselComponent implements OnInit{
    
    @Input()
    images: Image[];
    
    constructor() {              
    }
    
    ngOnInit(){
        $('.carousel').carousel();
    }

    isActive(img: Image) {
        return img === this.images[0];
    }
}