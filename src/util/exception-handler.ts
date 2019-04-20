import { Paper } from "@appengine/airship";
import { Message } from "./message";
import { Status } from "./status";

export class ExceptionHandler extends Paper {

    public static RecordNotFound (res: any, message:string = Message.NOTE_FOUND ) {
        res.status(Status.NOT_FOUND).json(message)
    }

}