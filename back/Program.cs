using System.Text;
using System.Text.Json;
using MySqlConnector;

namespace back
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddCors();
            builder.Services.AddTransient<MySqlConnection>(sp =>
            {
                var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
                return new MySqlConnection(connectionString);
            });
            var app = builder.Build();
            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.MapPost("/api/person/create", async (HttpContext context, MySqlConnection connection) =>
            {
                var command = connection.CreateCommand();
                command.CommandText = "INSERT Person(Photo, Surname, Name, Patronymic, PasportNumber, PasportSerial, Birthday, Sex, HomeAddress, PhoneNumber, Email)" +
                " VALUES (@Photo, @Surname, @Name, @Patronymic, @PasportNumber, @PasportSerial, @Birthday, @Sex, @HomeAddress, @PhoneNumber, @Email);" +
                "SELECT LAST_INSERT_ID();";
                
                var person = await JsonSerializer.DeserializeAsync<Person>(context.Request.Body);
                if (person == null)
                    return "-1";
                command.Parameters.AddWithValue("@Photo", person.PhotoRaw);
                command.Parameters.AddWithValue("@Surname", person.surname);
                command.Parameters.AddWithValue("@Name", person.name);
                command.Parameters.AddWithValue("@Patronymic", person.patronymic);
                command.Parameters.AddWithValue("@PasportNumber", person.PasportNumber);
                command.Parameters.AddWithValue("@PasportSerial", person.PasportSerial);
                command.Parameters.AddWithValue("@Birthday", person.birthday);
                command.Parameters.AddWithValue("@Sex", person.sex);
                command.Parameters.AddWithValue("@HomeAddress", person.home);
                command.Parameters.AddWithValue("@PhoneNumber", person.phone);
                command.Parameters.AddWithValue("@Email", person.email);
                
                await connection.OpenAsync();
                using var ret = await command.ExecuteReaderAsync();
                ret.Read();
                return $"{{\"personId\": {ret.GetInt32(0)}}}";
            });

            app.MapPost("/api/pacient/create", async (HttpContext context, MySqlConnection connection) =>
            {
                var command = connection.CreateCommand();
                command.CommandText = "INSERT Pacient(PersonId, MedicalCardNumber, medicalCardIssuance, LastAppeal, NextAppeal, InsurancePolicyNumber, InsurancePolicyExpiration, Diagnosis, MedicalHistory)" +
                " VALUES (@PersonId, @MedicalCardNumber, @medicalCardIssuance, @LastAppeal, @NextAppeal, @InsurancePolicyNumber, @InsurancePolicyExpiration, @Diagnosis, @MedicalHistory);" +
                "SELECT LAST_INSERT_ID();";

                var pacient = await JsonSerializer.DeserializeAsync<Pacient>(context.Request.Body);
                if (pacient == null)
                    return "-1";
                command.Parameters.AddWithValue("@PersonId", pacient.personId);
                command.Parameters.AddWithValue("@MedicalCardNumber", Convert.ToInt32(pacient.cardNumber));
                command.Parameters.AddWithValue("@medicalCardIssuance", Convert.ToInt32(pacient.cardValidity));
                command.Parameters.AddWithValue("@LastAppeal", pacient.lastEntry);
                command.Parameters.AddWithValue("@NextAppeal", pacient.nextEntry);
                command.Parameters.AddWithValue("@InsurancePolicyNumber", Convert.ToInt32(pacient.policyNumber));
                command.Parameters.AddWithValue("@InsurancePolicyExpiration", pacient.policyValidity);
                command.Parameters.AddWithValue("@Diagnosis", pacient.diagnostics);
                command.Parameters.AddWithValue("@MedicalHistory", pacient.medicalHistory);
                await connection.OpenAsync();
                using var ret = await command.ExecuteReaderAsync();
                ret.Read();
                return $"{{\"pacientId\": {ret.GetInt32(0)}}}";
            });

            app.MapGet("/api/pacient/{id:int}", async (int id, HttpContext context, MySqlConnection connection) =>
            {
                var command = connection.CreateCommand();
                command.CommandText = "SELECT * FROM Pacient JOIN Person;";

                await connection.OpenAsync();
                using var ret = await command.ExecuteReaderAsync();
                ret.Read();

                return JsonSerializer.Serialize(new {
                    photo = Person.ConvertByteArrayToUrlData((byte[])ret["Photo"]),
                    name = ret.GetString("Name"),
                    surname = ret.GetString("SurName"),
                    patronymic = ret.GetString("Patronymic"),
                    sex = ret.GetString("Sex"),
                    pasport = $"{ret["PasportNumber"]} {ret["PasportSerial"]}",
                    birthday = ret["Birthday"],
                    home = ret.GetString("HomeAddress"),
                    phone = ret.GetString("PhoneNumber"),
                    email = ret.GetString("Email"),
                    lastEntry = ret["LastAppeal"],
                    nextEntry = ret["NextAppeal"],
                    policyNumber = ret.GetInt32("InsurancePolicyNumber"),
                    policyValidity = ret["InsurancePolicyExpiration"],
                    diagnostics = ret.GetString("Diagnosis"),
                    medicalHistory = ret.GetString("MedicalHistory")
              });
            });
            app.Run();
        }
    }
}
