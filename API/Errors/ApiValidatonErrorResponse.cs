namespace API.Errors
{
    public class ApiValidatonErrorResponse : ApiResponse
    {
        public ApiValidatonErrorResponse() : base(400)
        {
        }
        public IEnumerable<string> Errors {get; set;}
    }
}