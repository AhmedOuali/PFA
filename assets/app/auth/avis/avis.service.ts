import { Avis } from "./avis.model";
import {Http,Response,Headers} from "@angular/http";
import{Injectable} from"@angular/core";
import { ErrorService } from "./../../error/error.service";


import 'rxjs/Rx';
import { Observable } from "rxjs";

@Injectable()
export class AvisService {
    private messages:Avis[]=[];
   
  constructor(
      private http: Http,
      private errorService: ErrorService){}
                    addMessage(message:Avis)
                    {
                        this.messages.push(message);
                        const body=JSON.stringify(message);//attach the body to the Post method
                        const headers=new Headers({'Content-Type':'application/json'});//format du fichier
                        return this.http.post('http://pfa01-xcapo32.c9users.io/avis',body,{headers:headers})//here is the attachement of the body to the request post
                        .map((response:Response) => {
                            const result=response.json();
                            const message= new Avis(result.obj.content,result.obj.name,result.obj.email,result.obj._id);
                            this.errorService.handleError({title: response.json().title, text: response.json().message, type: 'success'});//creating an alert success
                            this.messages.push(message);
                            return message;
                            
                        })//transform data to the server ---transform data th the post method who saves data--
                        .catch((error: Response) =>{
                            console.log(error);
                            this.errorService.handleError({title: error.json().title, text: error.json().message, type: 'error'})//creating an alert error;
                            return Observable.throw(error.json())//To like map for the success case , this allows to handel errors ,,,, we added (Observable) because catch() operator dont return Observable object
                        });      
                        //map et catch sont en relation avec les serveur lorsque on trouve une erreur on appel ay methode erreur dans le post method
                    }//creation d'un observable it's like an intern server which can transfer and stock data and at the end transfer a response to server and getting response from components
                
                    getMessages()
                    {
                        return this.http.get('http://pfa01-xcapo32.c9users.io/avis')
                        .map((response:Response)=>{
                            const messages=response.json().obj;
                            let transformedMessages:Avis[]=[];
                            for (let message of messages) {
                                transformedMessages.push(new Avis(message.content,message.name,message.email,message._id));
                            };
                            this.messages=transformedMessages;
                            return transformedMessages;
                        })
                       .catch((error: Response) =>Observable.throw(error.json())); 
                    
                    }
                    deleteMessage(message: Avis) {
                                   this.messages.splice(this.messages.indexOf(message), 1);
    }
                    
                   
}