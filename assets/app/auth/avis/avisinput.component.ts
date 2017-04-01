import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AvisService } from "./avis.service";
import { Avis} from "./avis.model";

@Component({
    selector: 'app-avisinput',
    templateUrl: './avisinput.component.html'
  
})
export class AvisInputComponent  {
    message: Avis;
    form: FormGroup;

    constructor(private Service: AvisService) {}
    ngOnInit(){
        this.form = new FormGroup({
            name: new FormControl(null, Validators.required),
            email: new FormControl(null, Validators.required),
            content: new FormControl(null, Validators.required),
           
        });
    }
    
    onSubmit() {
        
            // Create
            const message = new Avis(this.form.value.content, this.form.value.name,this.form.value.email);
            this.Service.addMessage(message)
                .subscribe(
                    data => console.log(data),
                    error => {
                        console.error(error);
                    }
                );
        
        this.form.reset();
    }

    onClear() {
        this.message = null;
        this.form.reset();
    }

 
    
}