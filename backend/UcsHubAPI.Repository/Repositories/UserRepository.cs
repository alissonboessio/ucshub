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
            throw new NotImplementedException();
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

                        return user;
                    }                                
                    
                }
            }

            return null;
        }
        
        public bool Add(UserModel user)
        {
            throw new NotImplementedException();
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
