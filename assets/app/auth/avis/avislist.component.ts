import { Component , OnInit } from '@angular/core';
import { Avis } from "./avis.model";
import {AvisService} from "./avis.service";


@Component({selector: 'app-avislist',
           templateUrl: 'avislist.component.html'
           
})  


                 
     
                 
     
    

export class AvisListComponent implements OnInit {
    messages : Avis [];

    constructor(private service : AvisService) {}   
                              
    ngOnInit() {
        this.service.getMessages().subscribe(
            (messages : Avis [] ) => {this.messages = messages});
    }
}