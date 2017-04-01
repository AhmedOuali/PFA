export class Avis {
    content: string;
    email: string;
    name: string;
    avisId: string;
   

    constructor (content: string, name: string, email: string, avisId?: string){
        this.content = content;
        this.email = email;
        this.name = name;
        this.avisId = avisId;
    
    } 
}