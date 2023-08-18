import { Observable } from "rxjs";
import { Utente } from "../model/utente";
import { Appuntamento } from "../model/appuntamento";

export interface Uservice {

    registerUtente(ut: Utente): Observable<any>;
    getAllAppuntamentiUtente(id_utente: string): Observable<Appuntamento[]>;
    registerAppuntamento(id_utente: string, id_medico:string, data: string): Observable<any>;
    deleteAppuntamento(id_appuntamento: number): Observable<any>;
}
