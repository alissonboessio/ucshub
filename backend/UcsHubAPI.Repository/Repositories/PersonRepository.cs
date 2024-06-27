
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
            string query = $"SELECT * FROM {this.Schema}";

            List<PersonModel> people = new List<PersonModel>();

            using (MySqlConnection connection = new MySqlConnection(ConnString))
            {
                MySqlCommand command = new MySqlCommand(query, connection);
                connection.Open();

                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var person = new PersonModel
                        {
                            Id = reader.GetInt32("id"),
                            Name = reader.GetStringH("name"),
                            BirthDate = reader.GetDateTimeH("birth_date"),
                            Phone = reader.GetStringH("phone"),
                            LattesId = reader.GetStringH("lattes_id"),
                            KnowledgeAreaId = reader.GetIntH("knowledge_area_id"),
                            InstitutionId = reader.GetIntH("instituition_id"),
                            //AddressId = reader.IsDBNull(reader.GetOrdinal("address_id")) ? (int?)null : reader.GetInt32("address_id"),
                            Type = (Model.Enumerations.PersonTypeEnum)reader.GetByte("type"),
                            Titulation = (Model.Enumerations.TitulationEnum)reader.GetByte("titulation")
                        };

                        people.Add(person);
                    }
                }
            }

            return people;
        }
        
        public int Count()
        {
            string query = $"SELECT count(*) as qtde FROM {this.Schema}";

            using (MySqlConnection connection = new MySqlConnection(ConnString))
            {
                MySqlCommand command = new MySqlCommand(query, connection);
                connection.Open();

                object result = command.ExecuteScalar();
                return Convert.ToInt32(result);
            }
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
                    try
                    {
                        if (reader.Read())
                        {
                            PersonModel person = new PersonModel
                            {
                                Id = reader.GetInt32("id"),
                                Name = reader.GetStringH("name"),
                                BirthDate = reader.GetDateTimeH("birth_date"),
                                Phone = reader.GetStringH("phone"),
                                LattesId = reader.GetStringH("lattes_id"),
                                Type = (Model.Enumerations.PersonTypeEnum)Enum.ToObject(typeof(Model.Enumerations.PersonTypeEnum), reader.GetByteH("type", 0)!),
                                Titulation = (Model.Enumerations.TitulationEnum)Enum.ToObject(typeof(Model.Enumerations.TitulationEnum), reader.GetByteH("titulation", 0)!)
                            };

                            return person;
                        }
                    }
                    catch (Exception w)
                    {

                        throw;
                    }
                   
                }
            }

            return null;

        }

        public bool Add(PersonModel person)
        {

            string query = $@"INSERT INTO {this.Schema}
            (name, birth_date, phone, lattes_id, knowledge_area_id, instituition_id, address_id, type, titulation)
            VALUES
            (@Name, @BirthDate, @Phone, @LattesId, @KnowledgeAreaId, @InstituitionId, @AddressId, @Type, @Titulation);
            SELECT LAST_INSERT_ID();";

            using (MySqlConnection connection = new MySqlConnection(ConnString))
            {
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@Name", person.Name);
                command.Parameters.AddWithValue("@BirthDate", person.BirthDate);
                command.Parameters.AddWithValue("@Phone", person.Phone);
                command.Parameters.AddWithValue("@LattesId", person.LattesId);
                command.Parameters.AddWithValue("@KnowledgeAreaId", null);
                command.Parameters.AddWithValue("@InstituitionId", null);
                command.Parameters.AddWithValue("@AddressId", null);
                command.Parameters.AddWithValue("@Type", person.Type.GetHashCode());
                command.Parameters.AddWithValue("@Titulation", person.Titulation.GetHashCode());
                connection.Open();
                object result = command.ExecuteScalar();
                person.Id = Convert.ToInt32(result);


            }

            return true;

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
