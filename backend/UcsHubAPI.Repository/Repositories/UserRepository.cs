using Microsoft.Data.SqlClient;
using MySql.Data.MySqlClient;
using UcsHubAPI.Model.Models;
using UcsHubAPI.Shared;

namespace UcsHubAPI.Repository.Repositories
{
    public class UserRepository : IRepository<UserModel>
    {
        public readonly string ConnString;
        public string Schema { get; }
        public UserRepository(string ConnString)
        {
            Schema = "user";
            this.ConnString = ConnString;
        }

        public IEnumerable<UserModel> GetAll()
        {
            throw new NotImplementedException();
        }
        
        public UserModel GetById(int id)
        {
            string query = $"SELECT * FROM {this.Schema} WHERE id = @id";

            using (MySqlConnection connection = new MySqlConnection(ConnString))
            {
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@id", id);

                connection.Open();

                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        UserModel user = new UserModel
                        {
                            Id = reader.GetInt32("id"),
                            Email = reader.GetStringH("email"),
                            VerifiedEmail = (bool)reader.GetBooleanH("verified_email"),
                            CreatedAt = reader.GetDateTime("created_at"),
                            VerifiedAt = reader.GetDateTimeH("verified_at")                            
                           };

                        int? person_id = reader.GetIntH("person_id");

                        if (person_id != null) {
                            user.Person = new PersonModel((int)person_id);
                        }

                        return user;
                    }
                }
            }

            return null;
        }

        public UserModel GetByEmailPassword(string email, string password)
        {
            string query = $"SELECT * FROM {this.Schema} WHERE email = @email AND password = @password";

            using (MySqlConnection  connection = new MySqlConnection (ConnString))
            {
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@email", email);
                command.Parameters.AddWithValue("@password", password);

                connection.Open();

                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        UserModel user = new UserModel
                        {
                            Id = reader.GetInt32("id"),
                            Email = reader.GetStringH("email"),
                            VerifiedEmail = (bool)reader.GetBooleanH("verified_email", false),
                            VerifiedAt = reader.GetDateTimeH("verified_at"),
                            
                        };

                        int? person_id = reader.GetIntH("person_id");

                        if (person_id != null)
                        {
                            user.Person = new PersonModel((int)person_id);
                        }

                        return user;
                    }                                
                    
                }
            }

            return null;
        }
        
        public bool CheckEmailRegistered(string email)
        {
            string query = $"SELECT count(*) FROM {this.Schema} WHERE email = @email";

            using (MySqlConnection connection = new MySqlConnection(ConnString))
            {
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@email", email);

                connection.Open();

                return Convert.ToInt32(command.ExecuteScalar()) > 0;

            
            }

        }

        public bool Add(UserModel user)
        {

            string query = $@"INSERT INTO {this.Schema} 
            (email, password, verified_email, person_id)
            VALUES
            (@Email, @Password, @VerifiedEmail, @person_id);
            SELECT LAST_INSERT_ID();";

            

            using (MySqlConnection connection = new MySqlConnection(ConnString))
            {
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@Email", user.Email);
                command.Parameters.AddWithValue("@Password", user.Password);
                command.Parameters.AddWithValue("@VerifiedEmail", user.VerifiedEmail);
                command.Parameters.AddWithValue("@person_id", user.Person?.Id);

                connection.Open();
                object result = command.ExecuteScalar();
                user.Id = Convert.ToInt32(result);
               
            }

            return true;

        }
        public bool Update(UserModel user)
        {
            throw new NotImplementedException();
        }
        public bool Delete(UserModel user)
        {
            throw new NotImplementedException();
        }

    }
}
