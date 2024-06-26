
using MySql.Data.MySqlClient;
using Org.BouncyCastle.Ocsp;
using System.Data;
using System.Transactions;
using UcsHubAPI.Model.Enumerations;
using UcsHubAPI.Model.HelperObjects;
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

        public IEnumerable<ProjectsListObj> GetAllSimpleFiltered(PersonModel Person = null)
        {
            List<ProjectsListObj> projectsList = new List<ProjectsListObj>();

            string query = $"SELECT p.id, p.title, p.created_at, pp.person_id, pe.name FROM {this.Schema} p " +
                           "JOIN person_project pp ON p.id = pp.project_id " +
                           "LEFT JOIN person pe ON pp.person_id = pe.id ";

            if (Person != null)
            {
                query += " WHERE pp.person_id = @personId";
            }

            using (MySqlConnection connection = new MySqlConnection(ConnString))
            {
                MySqlCommand command = new MySqlCommand(query, connection);
                connection.Open();

                if (Person != null)
                {
                    command.Parameters.AddWithValue("@personId", Person.Id);
                }

                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    Dictionary<int, ProjectsListObj> projectsDict = new Dictionary<int, ProjectsListObj>();

                    while (reader.Read())
                    {
                        int projectId = reader.GetInt32("id");
                        string personName = reader.GetStringH("name");

                        if (!projectsDict.ContainsKey(projectId))
                        {
                            ProjectsListObj project = new ProjectsListObj
                            {
                                Id = projectId,
                                Title = reader.GetStringH("title"),
                                DateCreated = reader.GetDateTime("created_at")
                            };
                            projectsDict.Add(projectId, project);
                        }

                        if (!string.IsNullOrEmpty(personName))
                        {
                            projectsDict[projectId].people.Add(personName);
                            projectsDict[projectId].peoplemodel.Add(new PersonModel(reader.GetInt32("person_id"), personName));
                        }
                    }

                    projectsList = new List<ProjectsListObj>(projectsDict.Values);
                }
            }

            return projectsList;
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
                        InstitutionId = reader.GetInt32("instituition_id"),
                        Authors = new List<PersonModel>()
                    };

                    int? inst_id = project.InstitutionId;

                    if (inst_id != null)
                    {
                        project.Institution = new InstitutionModel((int)inst_id);
                    }

                    string sqlAuthors = $"SELECT * FROM person_project WHERE project_id = @id";

                    using (MySqlConnection connection2 = new MySqlConnection(ConnString))
                    {
                        MySqlCommand command2 = new MySqlCommand(sqlAuthors, connection2);
                        command2.Parameters.AddWithValue("@id", project.Id);

                        connection2.Open();

                        MySqlDataReader reader2 = command2.ExecuteReader();
                        while (reader2.Read())
                        {
                            PersonRepository personRepo = new PersonRepository(ConnString);

                            project.Authors.Add(personRepo.GetById(reader2.GetInt32("person_id")));

                        }
                    }

                }
            }

            return project;
        }
        public bool Add(ProjectModel project)
        {
            string query = $@"
                INSERT INTO {this.Schema}
                (title, description, status, type, ended_at, instituition_id)
                VALUES
                (@Title, @Description, @Status, @Type, @EndedAt, @InstituitionId);
                SELECT LAST_INSERT_ID();
            ";

            using (MySqlConnection connection = new MySqlConnection(ConnString))
            {
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@Title", project.Title);
                command.Parameters.AddWithValue("@Description", project.Description);
                command.Parameters.AddWithValue("@Status", project.Status);
                //command.Parameters.AddWithValue("@Type", project.Type);
                command.Parameters.AddWithValue("@Type", 0);
                command.Parameters.AddWithValue("@EndedAt", project.EndedAt);
                command.Parameters.AddWithValue("@InstituitionId", project.Institution.Id);

                connection.Open();

                object result = command.ExecuteScalar();
                project.Id = Convert.ToInt32(result);
               
            }

            return true;
        }
        public bool Update(ProjectModel project)
        {
            string query = $@"
                UPDATE {this.Schema}
                SET 
                    title = @Title,
                    description = @Description,
                    status = @Status,
                    type = @Type,
                    ended_at = @EndedAt,
                    instituition_id = @InstituitionId
                WHERE id = @Id;
            ";

            using (MySqlConnection connection = new MySqlConnection(ConnString))
            {
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@Title", project.Title);
                command.Parameters.AddWithValue("@Description", project.Description);
                command.Parameters.AddWithValue("@Status", project.Status);
                //command.Parameters.AddWithValue("@Type", project.Type);
                command.Parameters.AddWithValue("@Type", 0);
                command.Parameters.AddWithValue("@EndedAt", project.EndedAt);
                command.Parameters.AddWithValue("@InstituitionId", project.Institution.Id);
                command.Parameters.AddWithValue("@Id", project.Id);
              
                connection.Open();
                return command.ExecuteNonQuery() > 0;
               
            }
        }

        public bool Delete(ProjectModel project)
        {
            string query = $"DELETE FROM {this.Schema} WHERE id = @id";

            using (MySqlConnection connection = new MySqlConnection(ConnString))
            {
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@id", project.Id);

                connection.Open();
                return command.ExecuteNonQuery() > 0;

            }
        }

        public bool UpdateAuthors(List<PersonModel> authors, ProjectModel project)
        {
            using (MySqlConnection connection = new MySqlConnection(ConnString))
            {
                connection.Open();
                MySqlTransaction transaction = connection.BeginTransaction();

                try
                {
                    string deleteQuery = @"
                        DELETE FROM person_project
                        WHERE project_id = @projectId;
                    ";

                    MySqlCommand deleteCommand = new MySqlCommand(deleteQuery, connection, transaction);
                    deleteCommand.Parameters.AddWithValue("@projectId", project.Id);
                    int deleteResult = deleteCommand.ExecuteNonQuery();

                    string insertQuery = @"
                    INSERT INTO person_project (person_id, project_id)
                    VALUES ";

                    List<string> authorProject = new List<string>();
                    List<MySqlParameter> parameters = new List<MySqlParameter>();

                    for (int i = 0; i < authors.Count; i++)
                    {
                        authorProject.Add($"(@personId{i}, @projectId{i})");
                        parameters.Add(new MySqlParameter($"@personId{i}", authors[i].Id));
                        parameters.Add(new MySqlParameter($"@projectId{i}", project.Id));
                    }

                    insertQuery += string.Join(", ", authorProject);

                    MySqlCommand insertCommand = new MySqlCommand(insertQuery, connection, transaction);
                    insertCommand.Parameters.AddRange(parameters.ToArray());
                    int insertResult = insertCommand.ExecuteNonQuery();

                    transaction.Commit();

                    return deleteResult >= 0 && insertResult == authors.Count;
                }
                catch (Exception)
                {
                    transaction.Rollback();
                    return false;
                }
            }
        }


    }
}
