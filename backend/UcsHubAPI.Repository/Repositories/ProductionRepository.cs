
using Microsoft.Data.SqlClient;
using MySql.Data.MySqlClient;
using System.Data;
using UcsHubAPI.Model.Enumerations;
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
            ProductionModel production = null;

            using (MySqlConnection connection = new MySqlConnection(ConnString))
            {
                string query = @"
            SELECT p.id, p.title, p.description, p.created_at, p.type,
                   prj.id as project_id, prj.title as project_title,
                   per.id as person_id, per.name as person_name
            FROM production p
            INNER JOIN project prj ON p.project_id = prj.id
            LEFT JOIN person_production pp ON p.id = pp.production_id
            LEFT JOIN person per ON pp.person_id = per.id
            WHERE p.id = @Id;";

                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@Id", id);

                connection.Open();
                MySqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    if (production == null)
                    {
                        production = new ProductionModel
                        {
                            Id = reader.GetInt32("id"),
                            Title = reader.GetStringH("title"),
                            Description = reader.GetStringH("description"),
                            DateCreated = reader.GetDateTime("created_at"),
                            Type = (Model.Enumerations.ProductionTypeEnum)reader.GetByte("type"),
                            Project = new ProjectModel
                            {
                                Id = reader.GetInt32("project_id"),
                                Title = reader.GetStringH("project_title")
                            },
                            Authors = new List<PersonModel>(),
                            ProjectId = reader.GetInt32("project_id")
                        };
                    }

                    if (reader.GetIntH("person_id") != null)
                    {
                        PersonRepository personRepo = new PersonRepository(ConnString);

                        production.Authors.Add(personRepo.GetById(reader.GetInt32("person_id")));
                       
                    }
                }

                reader.Close();
            }

            return production;
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
        
        public int Count(ProductionTypeEnum type)
        {
            string query = $"SELECT count(*) as qtde FROM {this.Schema} WHERE type = @type";

            using (MySqlConnection connection = new MySqlConnection(ConnString))
            {
                MySqlCommand command = new MySqlCommand(query, connection);
                connection.Open();

                command.Parameters.AddWithValue("type", type.GetHashCode());

                object result = command.ExecuteScalar();
                return Convert.ToInt32(result);
            }
        }

        public bool Add(ProductionModel production)
        {
            using (MySqlConnection connection = new MySqlConnection(ConnString))
            {
                string query = @"INSERT INTO Production (title, description, type, project_id)
                                 VALUES (@Title, @Description, @Type, @ProjectId);
                                 SELECT LAST_INSERT_ID();";

                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@Title", production.Title);
                command.Parameters.AddWithValue("@Description", production.Description);
                command.Parameters.AddWithValue("@Type", production.Type);
                command.Parameters.AddWithValue("@ProjectId", production.ProjectId);
                
                connection.Open();
                int newProductionId = Convert.ToInt32(command.ExecuteScalar());
                production.Id = newProductionId;
                if (newProductionId > 0 && production.Authors != null && production.Authors.Count > 0)
                {
                    // Add authors
                    foreach (var author in production.Authors)
                    {
                        AddAuthorForProduction(connection, newProductionId, author.Id);
                    }
                }

                return true;
            }
        }
        public bool Update(ProductionModel production)
        {
            using (MySqlConnection connection = new MySqlConnection(ConnString))
            {
                string updateQuery = @"UPDATE Production
                                       SET title = @Title,
                                           description = @Description,
                                           type = @Type,
                                           project_id = @ProjectId
                                       WHERE Id = @Id;";

                MySqlCommand updateCommand = new MySqlCommand(updateQuery, connection);
                updateCommand.Parameters.AddWithValue("@Id", production.Id);
                updateCommand.Parameters.AddWithValue("@Title", production.Title);
                updateCommand.Parameters.AddWithValue("@Description", production.Description);
                updateCommand.Parameters.AddWithValue("@Type", production.Type);
                updateCommand.Parameters.AddWithValue("@ProjectId", production.ProjectId);

                
                connection.Open();
                updateCommand.ExecuteNonQuery();

                UpdateAuthorsForProduction(connection, (int)production.Id, production.Authors);

                return true;
               
            }
        }

        private void AddAuthorForProduction(MySqlConnection connection, int productionId, int personId)
        {
            string insertAuthorQuery = @"INSERT INTO person_production (production_id, person_id)
                                         VALUES (@ProductionId, @PersonId);";

            MySqlCommand insertAuthorCommand = new MySqlCommand(insertAuthorQuery, connection);
            insertAuthorCommand.Parameters.AddWithValue("@ProductionId", productionId);
            insertAuthorCommand.Parameters.AddWithValue("@PersonId", personId);

            insertAuthorCommand.ExecuteNonQuery();
        }

        private void UpdateAuthorsForProduction(MySqlConnection connection, int productionId, List<PersonModel> authors)
        {
            string deleteAuthorsQuery = @"DELETE FROM person_production WHERE production_id = @ProductionId;";
            MySqlCommand deleteAuthorsCommand = new MySqlCommand(deleteAuthorsQuery, connection);
            deleteAuthorsCommand.Parameters.AddWithValue("@ProductionId", productionId);
            deleteAuthorsCommand.ExecuteNonQuery();

            foreach (var author in authors)
            {
                AddAuthorForProduction(connection, productionId, author.Id);
            }
        }
        public bool Delete(ProductionModel prod)
        {
            string query = $"DELETE FROM {this.Schema} WHERE id = @id";

            using (MySqlConnection connection = new MySqlConnection(ConnString))
            {
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@id", prod.Id);

                connection.Open();
                return command.ExecuteNonQuery() > 0;

            }
        }


    }
}
