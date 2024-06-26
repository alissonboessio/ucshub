
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
        
        public IEnumerable<ProductionModel> GetAllByProjectId(int project_id)
        {
            List<ProductionModel> productions = new List<ProductionModel>();

            string query = $"SELECT * FROM {this.Schema} WHERE project_id = @project_id";

            using (MySqlConnection connection = new MySqlConnection(ConnString))
            {
                MySqlCommand command = new MySqlCommand(query, connection);
                connection.Open();

                command.Parameters.AddWithValue("project_id", project_id);

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

        // to-do title filter
        public IEnumerable<ProductionListObj> GetAllSimpleFiltered(PersonModel Person = null)
        {
            List<ProductionListObj> productions = new List<ProductionListObj>();

            string baseQuery = $"SELECT p.id, p.title, p.created_at, p.type, GROUP_CONCAT(pe.name SEPARATOR ', ') as people FROM {this.Schema} p " +
                               "LEFT JOIN person_production pp ON p.id = pp.production_id " +
                               "LEFT JOIN person pe ON pp.person_id = pe.id ";

            string filterQuery = Person != null ? "WHERE pp.person_id = @personId " : "";

            string groupQuery = "GROUP BY p.id, p.title, p.created_at, p.type";

            string finalQuery = baseQuery + filterQuery + groupQuery;

            using (MySqlConnection connection = new MySqlConnection(ConnString))
            {
                MySqlCommand command = new MySqlCommand(finalQuery, connection);

                if (Person != null)
                {
                    command.Parameters.AddWithValue("@personId", Person.Id);
                }

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
                        people = reader.GetString("people").Split(new[] { ", " }, StringSplitOptions.RemoveEmptyEntries).ToList()
                    };

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
