import { Component , Input , Output, EventEmitter } from '@angular/core';
import { Avis } from "./avis.model";
import { AvisService } from "./avis.service";
import { Pipe, PipeTransform } from '@angular/core';
@Component({
    selector:'app-avis',
    templateUrl:'./avis.component.html',
    
     styles : [` 
                 .author { 
                            display : inline-block;
                            font-style: italic;
                            font-size:12px;
                            width:80%;
                                        }
                         .config { 
                            display : inline-block;
                            font-style: right;
                            font-size:12px;
                            width:19%;
                                       } 
            `]    
     })
    
     export class AvisComponent {
        @Input() message: Avis;
      
        //@Output() EditClick2 = new EventEmitter<string>();//editting something : the edit will be passed when we call the component in the main template
         Color = 'Wheat';
         constructor(private Service: AvisService) {}
      
         onDelete() {
        this.Service.deleteMessage(this.message);
      }
     }
     