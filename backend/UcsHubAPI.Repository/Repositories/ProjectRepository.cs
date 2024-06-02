using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UcsHubAPI.Model.Enumerations;
using UcsHubAPI.Model.Models;

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

            using (SqlConnection connection = new SqlConnection(ConnString))
            {
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@id", id);
                connection.Open();

                SqlDataReader reader = command.ExecuteReader();
                if (reader.Read())
                {
                    project = new ProjectModel
                    {
                        Id = Convert.ToInt32(reader["Id"]),
                        Title = reader["Title"].ToString(),
                        Description = reader["Description"].ToString(),
                        Status = (ProjectStatusEnum)Convert.ToInt32(reader["Status"]),
                        Type = (ProjectTypeEnum)Convert.ToInt32(reader["Type"]),
                        CreatedAt = Convert.ToDateTime(reader["CreatedAt"]),
                        EndedAt = (DateTime?)Convert.ToDateTime(reader["EndedAt"]),
                        InstitutionId = Convert.ToInt32(reader["InstitutionId"])
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
