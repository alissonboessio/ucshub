
using MySql.Data.MySqlClient;
using UcsHubAPI.Model.HelperObjects;
using UcsHubAPI.Model.Models;
using UcsHubAPI.Shared;

namespace UcsHubAPI.Repository.Repositories
{
    public class ProductionRepository : IRepository<ProductionModel>
    {
        public readonly string ConnString;
        public string Schema { get; }

        public ProductionRepository(string ConnString)
        {
            Schema = "production";
            this.ConnString = ConnString;
        }

        public IEnumerable<ProductionModel> GetAll()
        {
            List<ProductionModel> productions = new List<ProductionModel>();

            string query = $"SELECT * FROM {this.Schema}";

            using (MySqlConnection connection = new MySqlConnection(ConnString))
            {
                MySqlCommand command = new MySqlCommand(query, connection);
                connection.Open();

                MySqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    ProductionModel production = new ProductionModel
                    {
                        Id = reader.GetInt32("id"),
                        Title = reader.GetStringH("title"),
                        Description = reader.GetStringH("description"),
                        DateCreated = (DateTime)reader.GetDateTimeH("created_at")!,
                        Type = (Model.Enumerations.ProductionTypeEnum)Enum.ToObject(typeof(Model.Enumerations.ProductionTypeEnum), reader.GetByteH("type", 0)!),
                        ProjectId = reader.GetInt32("project_id")
                    };

                    productions.Add(production);

                }
            }

            return productions;
        }
        
        public IEnumerable<ProductionListObj> GetAllSimple()
        {
            List<ProductionListObj> productions = new List<ProductionListObj>();

            string query = $"SELECT id, title, created_at, type FROM {this.Schema}";

            string queryP = $"SELECT name FROM {this.Schema} INNER JOIN " +
                $"person_production on production_id = {this.Schema}.id INNER JOIN " +
                $"person on person.id = person_id WHERE {this.Schema}.id = @id";

            using (MySqlConnection connection = new MySqlConnection(ConnString))
            {
                MySqlCommand command = new MySqlCommand(query, connection);
                connection.Open();

                MySqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    ProductionListObj production = new ProductionListObj
                    {
                        Id = reader.GetInt32("id"),
                        Title = reader.GetStringH("title"),
                        DateCreated = reader.GetDateTime("created_at"),
                        Type = (Model.Enumerations.ProductionTypeEnum)Enum.ToObject(typeof(Model.Enumerations.ProductionTypeEnum), reader.GetByteH("type", 0)!),
                    };


                    using (MySqlConnection connectionP = new MySqlConnection(ConnString))
                    {
                        MySqlCommand commandP = new MySqlCommand(queryP, connectionP);
                        commandP.Parameters.AddWithValue("@id", production.Id);

                        connectionP.Open();

                        MySqlDataReader readerP = commandP.ExecuteReader();
                        while (readerP.Read())
                        {
                            production.people.Add(readerP.GetStringH("name"));
                        }
                    }

                    productions.Add(production);

                }
            }

            return productions;
        }

        public ProductionModel GetById(int id)
        {
            throw new NotImplementedException();
        }
        public bool Add(ProductionModel user)
        {
            throw new NotImplementedException();
        }
        public bool Update(ProductionModel user)
        {
            throw new NotImplementedException();
        }
        public bool Delete(ProductionModel user)
        {
            throw new NotImplementedException();
        }

    }
}
