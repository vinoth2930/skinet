using API.Errors;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            //Here adding scop for Generic Repository
            services.AddScoped(typeof(IGenericRepository<>),(typeof(GenericRepository<>)));
           
            //Here adding scop for Repository
            services.AddScoped<IProductRepository, ProductRepository>();

               services.Configure<ApiBehaviorOptions>(options =>
              {
                 options.InvalidModelStateResponseFactory = actionContext =>
                 {
                     var errors = actionContext.ModelState.Where(e => e.Value.Errors.Count > 0)
                     .SelectMany(x => x.Value.Errors)
                     .Select(x => x.ErrorMessage).ToArray();

                     var errorResponse = new ApiValidatonErrorResponse
                     {
                         Errors = errors
                     };
                     return new BadRequestObjectResult(errorResponse);
                 };
              });

              return services;
        }
        
    }
}