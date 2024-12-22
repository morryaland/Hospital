using System.Text.Json;
using Microsoft.Extensions.Configuration;
using MySql.Data;
using MySql.Data.MySqlClient;

namespace back
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddCors();
            var app = builder.Build();
            var mysqlconnection = new MySqlConnection(app.Configuration.GetConnectionString("DefaultConnection"));
            
            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader() );

            app.MapPost("/api/person/create", (Person person) => {
                Console.WriteLine(person);
                return JsonSerializer.Serialize(person);
            });

            app.MapPost("/api/pacient/create", (Pacient pacient) => {
                Console.WriteLine(pacient);
                return JsonSerializer.Serialize(pacient);
            });

            app.Run();
        }
    }
}