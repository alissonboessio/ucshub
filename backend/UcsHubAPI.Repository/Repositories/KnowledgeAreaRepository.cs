
using MySql.Data.MySqlClient;
using System.Data;
using UcsHubAPI.Model.Models;
using UcsHubAPI.Shared;

namespace UcsHubAPI.Repository.Repositories
{
    public class KnowledgeAreaRepository : IRepository<KnowledgeAreaModel>
    {
        public readonly string ConnString;
        public string Schema { get; }
        public KnowledgeAreaRepository(string ConnString)
        {
            Schema = "knowledge_area";
            this.ConnString = ConnString;
        }

        public KnowledgeAreaModel? GetById(int id)
        {
            KnowledgeAreaModel knowledgeArea = null;

            string query = "SELECT * FROM knowledge_area WHERE id = @id";

            using (MySqlConnection connection = new MySqlConnection(ConnString))
            {
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@id", id);
                connection.Open();

                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        knowledgeArea = new KnowledgeAreaModel
                        {
                            Id = reader.GetInt32("id"),
                            Name = reader.GetStringH("name"),
                            CodCnpq = reader.GetStringH("cod_cnpq"),
                            KnowledgeSubarea = new List<KnowledgeAreaModel>()
                        };
                            
                    }
                }

            }

            if (knowledgeArea == null) 
            {
                return null;
            }

            string query2 = "SELECT * FROM knowledge_area WHERE knowledge_parentarea_id = @parent_id";

            using (MySqlConnection connection = new MySqlConnection(ConnString))
            {
                MySqlCommand command = new MySqlCommand(query2, connection);
                command.Parameters.AddWithValue("@parent_id", knowledgeArea.Id);
                connection.Open();

                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        knowledgeArea.KnowledgeSubarea.Add(
                            new KnowledgeAreaModel
                            {
                                Id = reader.GetInt32("id"),
                                Name = reader.GetStringH("name"),
                                CodCnpq = reader.GetStringH("cod_cnpq"),
                            }
                        );
                            
                    }
                }

            }

            return knowledgeArea;

        }

        public IEnumerable<KnowledgeAreaModel> GetAll()
        {
            var knowledgeAreas = new List<KnowledgeAreaModel>();

            string query = "SELECT id FROM knowledge_area";

            using (MySqlConnection connection = new MySqlConnection(ConnString))
            {
                MySqlCommand command = new MySqlCommand(query, connection);
                connection.Open();

                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {

                        int id = reader.GetInt32("id");

                        var knowledgeArea = GetById(id);

                        if (knowledgeArea != null)
                        {
                            knowledgeAreas.Add(knowledgeArea);

                        }

                    }
                }
            }

            return knowledgeAreas;
        }

        public bool Add(KnowledgeAreaModel person)
        {

            throw new NotImplementedException();

        }
        public bool Update(KnowledgeAreaModel user)
        {
            throw new NotImplementedException();
        }
        public bool Delete(KnowledgeAreaModel user)
        {
            throw new NotImplementedException();
        }

    }
}
