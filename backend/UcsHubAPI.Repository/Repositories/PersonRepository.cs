
using MySql.Data.MySqlClient;
using System.Data;
using UcsHubAPI.Model.Models;
using UcsHubAPI.Shared;

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

            using (MySqlConnection connection = new MySqlConnection(ConnString))
            {
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@id", id);

                connection.Open();

                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        PersonModel person = new PersonModel
                        {
                            Id = reader.GetInt32("id"),
                            Name = reader.GetStringH("name"),
                            BirthDate = reader.GetDateTime("birth_date"),
                            Phone = reader.GetStringH("phone"),
                            LattesId = reader.GetStringH("lattes_id"),
                            Type = (Model.Enumerations.PersonTypeEnum)Enum.ToObject(typeof(Model.Enumerations.PersonTypeEnum), reader.GetByteH("type", 0)!),
                            Titulation = (Model.Enumerations.TitulationEnum)Enum.ToObject(typeof(Model.Enumerations.TitulationEnum), reader.GetByteH("titulation", 0)!)
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
