class apierror extends Error{
    constructor(
        message = "Something went wrong",
        statusCode,
        error=[]
        
    ) {
        super(message);
        this.statusCode = statusCode;
        this.error = error;
    }
}
export default apierror;