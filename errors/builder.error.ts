export class BuilderError {



    public static returnApiMessage(message: string): Object{
        return {
            "error": message
        };
    }

}