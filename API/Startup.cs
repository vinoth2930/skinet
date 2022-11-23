using API.Extensions;
using API.Helpers;
using AutoMapper;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;
        public Startup(IConfiguration config)
        {
           _config = config;
        }

                        //public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // //Here adding scop for Generic Repository
            // services.AddScoped(typeof(IGenericRepository<>),(typeof(GenericRepository<>)));
           
            // //Here adding scop for Repository
            // services.AddScoped<IProductRepository, ProductRepository>();

            //Auto Mapper
            services.AddAutoMapper(typeof(MappingProfiles));

            services.AddControllers();
             services.AddDbContext<StoreContext>(x => 
             x.UseSqlite(_config.GetConnectionString("DefaultConnection")));

            //  services.Configure<ApiBehaviorOptions>(options =>
            //  {
            //     options.InvalidModelStateResponseFactory = actionContext =>
            //     {
            //         var errors = actionContext.ModelState.Where(e => e.Value.Errors.Count > 0)
            //         .SelectMany(x => x.Value.Errors)
            //         .Select(x => x.ErrorMessage).ToArray();

            //         var errorResponse = new ApiValidatonErrorResponse
            //         {
            //             Errors = errors
            //         };
            //         return new BadRequestObjectResult(errorResponse);
            //     };
            //  });
            
            // services.AddDbContext<StoreContext>(x => 
            // x.UseSqlServer(_config.GetConnectionString("Server=127.0.0.1;Database=VinothDB;Id=SA;Password=MyPass@word;")));
            
            services.AddApplicationServices();
            services.AddSwaggerDocumentation();


           
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            
            
            if (env.IsDevelopment())
            {
                //Here we are not using Development Midlle ware so comenting below line
                //app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPIv5 v1"));
            }

            app.UseStatusCodePagesWithReExecute("/errors/{0}");

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseStaticFiles();

            app.UseAuthorization();

            app.UseSwaggerDocumentation();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
