
using MySql.Data.MySqlClient;
using System.Data;
using UcsHubAPI.Model.Enumerations;
using UcsHubAPI.Model.Models;
using UcsHubAPI.Shared;

namespace UcsHubAPI.Repository.Repositories
{
    public class ProjectRepository : IRepository<ProjectModel>
    {
        public readonly string ConnString;
        public string Schema { get; }

        public ProjectRepository(string ConnString)
        {
            Schema = "project";
            this.ConnString = ConnString;
        }

        public IEnumerable<ProjectModel> GetAll()
        {
            throw new NotImplementedException();
        }

        public ProjectModel GetById(int id)
        {
            
            ProjectModel project = null;

            string query = $"SELECT * FROM {this.Schema} WHERE id = @id";

            using (MySqlConnection connection = new MySqlConnection(ConnString))
            {
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@id", id);
                connection.Open();

                MySqlDataReader reader = command.ExecuteReader();
                if (reader.Read())
                {
                    project = new ProjectModel
                    {
                        Id = reader.GetInt32("id"),
                        Title = reader.GetStringH("title"),
                        Description = reader.GetStringH("description"),
                        Status = (Model.Enumerations.ProjectStatusEnum)Enum.ToObject(typeof(Model.Enumerations.ProjectStatusEnum), reader.GetByteH("type", 0)!),
                        Type = (Model.Enumerations.ProjectTypeEnum)Enum.ToObject(typeof(Model.Enumerations.ProjectTypeEnum), reader.GetByteH("type", 0)!),

                        CreatedAt = reader.GetDateTime("created_at"),
                        EndedAt = reader.GetDateTimeH("ended_at"),
                        InstitutionId = reader.GetInt32("instituition_id")
                    };
                }
            }

            return project;
        }
        public bool Add(ProjectModel user)
        {
            throw new NotImplementedException();
        }
        public bool Update(ProjectModel user)
        {
            throw new NotImplementedException();
        }
        public bool Delete(ProjectModel user)
        {
            throw new NotImplementedException();
        }

    }
}
