using Microsoft.Data.SqlClient;
using UcsHubAPI.Model.Models;

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

            using (SqlConnection connection = new SqlConnection(ConnString))
            {
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@email", email);
                command.Parameters.AddWithValue("@password", password);

                connection.Open();

                using (SqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        UserModel user = new UserModel
                        {
                            Id = Convert.ToInt32(reader["id"]),
                            Email = reader["email"].ToString(),
                            VerifiedEmail = Convert.ToBoolean(reader["verified_email"]),
                            VerifiedAt = Convert.ToDateTime(reader["verified_at"]),
                            
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
