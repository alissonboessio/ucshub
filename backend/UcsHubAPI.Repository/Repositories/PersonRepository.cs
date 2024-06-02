using Microsoft.Data.SqlClient;
using UcsHubAPI.Model.Models;

namespace UcsHubAPI.Repository.Repositories
{
    public class PersonRepository : IRepository<PersonModel>
    {
        public readonly string ConnString;
        public string Schema { get; }
        public PersonRepository(string ConnString)
        {
            Schema = "person";
            this.ConnString = ConnString;
        }

        public IEnumerable<PersonModel> GetAll()
        {
            throw new NotImplementedException();
        }
        
        public PersonModel GetById(int id)
        {
            string query = $"SELECT * FROM {this.Schema} WHERE id = @id";

            using (SqlConnection connection = new SqlConnection(ConnString))
            {
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@id", id);

                connection.Open();

                using (SqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        PersonModel person = new PersonModel
                        {
                            Id = Convert.ToInt32(reader["id"]),
                            Name = reader["name"].ToString(),
                            BirthDate = Convert.ToDateTime(reader["birth_date"]),
                            Phone = reader["phone"].ToString(),
                            LattesId = reader["LattesId"].ToString(),
                            Type = (Model.Enumerations.PersonTypeEnum)reader["type"],
                            Titulation = (Model.Enumerations.TitulationEnum)reader["titulation"]
                        };

                        return person;
                    }
                    
                }
            }

            return null;

        }

        public bool Add(PersonModel user)
        {
            throw new NotImplementedException();
        }
        public bool Update(PersonModel user)
        {
            throw new NotImplementedException();
        }
        public bool Delete(PersonModel user)
        {
            throw new NotImplementedException();
        }

    }
}
