namespace API.Errors
{
    public class ApiException : ApiResponse
    {
        private readonly string _details;
        public ApiException(int statusCode, string message = null, string details 
        = null) : base(statusCode, message)
        {
            _details = details;

        }

        public string Details { get; set; }
    }
}