import { Observable } from "rxjs/internal/Observable";
import { Medico } from "../model/medico";
import { Appuntamento } from "../model/appuntamento";

export interface Mservice {

    registerMedico(med: Medico): Observable<any>;
    getAllAppuntamentiMedico(id_medico: string): Observable<Appuntamento[]>;
    
}
