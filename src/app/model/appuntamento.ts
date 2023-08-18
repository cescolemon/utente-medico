import { Medico } from "./medico";
import { Utente } from "./utente";

export class Appuntamento {
    
    id: number;
    utente: Utente
    medico: Medico;
    data: string;

}
