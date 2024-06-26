
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
    public class ResourceRequestRepository : IRepository<ResourceRequestModel>
    {
        public readonly string ConnString;
        public string Schema { get; }

        public ResourceRequestRepository(string ConnString)
        {
            Schema = "resource_request";
            this.ConnString = ConnString;
        }

        public IEnumerable<ResourceRequestModel> GetAll()
        {
            throw new NotImplementedException();
        }

        public ResourceRequestModel GetById(int id)
        {

         
        ResourceRequestModel resourceRequest = null;

        string query = @"
    SELECT rr.id, rr.quantity, rr.filed_at, rr.entry_at, rr.created_at, 
            rr.person_id, rr.project_id, rr.instituition_id,
            p.name as person_name, p.birth_date, p.phone, p.lattes_id, p.knowledge_area_id, p.instituition_id as person_instituition_id, p.address_id as person_address_id, p.type as person_type, p.titulation as person_titulation,
            pr.title as project_title, pr.description as project_description, pr.status as project_status, pr.type as project_type, pr.created_at as project_created_at, pr.ended_at as project_ended_at, pr.instituition_id as project_instituition_id,
            i.name as institution_name, i.document as institution_document, i.created_at as institution_created_at
    FROM resource_request rr
    JOIN person p ON rr.person_id = p.id
    JOIN project pr ON rr.project_id = pr.id
    JOIN institution i ON rr.instituition_id = i.id
    WHERE rr.id = @id";

        using (MySqlConnection connection = new MySqlConnection(ConnString))
        {
            MySqlCommand command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@id", id);
            connection.Open();

            using (MySqlDataReader reader = command.ExecuteReader())
            {
                if (reader.Read())
                {
                    resourceRequest = new ResourceRequestModel
                    {
                        Id = reader.GetInt32("id"),
                        Quantity = reader.GetDecimal("quantity"),
                        FiledAt = reader.GetDateTimeH("filed_at"),
                        EntryAt = reader.GetDateTime("entry_at"),
                        CreatedAt = reader.GetDateTime("created_at"),
                        Person = new PersonModel
                        {
                            Id = reader.GetInt32("person_id"),
                            Name = reader.GetString("person_name"),
                            BirthDate = reader.GetDateTimeH("birth_date"),
                            Phone = reader.GetStringH("phone"),
                            LattesId = reader.GetStringH("lattes_id"),
                            KnowledgeAreaId = reader.GetIntH("knowledge_area_id"),
                        },
                        Project = new ProjectModel
                        {
                            Id = reader.GetInt32("project_id"),
                            Title = reader.GetString("project_title")
                        },
                        Institution = new InstitutionModel
                        {
                            Id = reader.GetInt32("instituition_id"),
                            Name = reader.GetString("institution_name"),
                            Document = reader.GetStringH("institution_document"),
                        }
                    };
                }
            }
        }

        return resourceRequest;
    }
    public bool Add(ResourceRequestModel request)
        {
            string query = @"
        INSERT INTO resource_request
        (quantity, person_id, project_id, instituition_id)
        VALUES
        (@Quantity, @PersonId, @ProjectId, @InstituitionId);
        SELECT LAST_INSERT_ID();
    ";

            using (MySqlConnection connection = new MySqlConnection(ConnString))
            {
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@Quantity", request.Quantity);
                //command.Parameters.AddWithValue("@FiledAt", request.FiledAt);
                //command.Parameters.AddWithValue("@EntryAt", request.EntryAt);
                //command.Parameters.AddWithValue("@CreatedAt", request.CreatedAt);
                command.Parameters.AddWithValue("@PersonId", request.PersonId);
                command.Parameters.AddWithValue("@ProjectId", request.ProjectId);
                command.Parameters.AddWithValue("@InstituitionId", request.InstitutionId);

                connection.Open();
                object result = command.ExecuteScalar();
                request.Id = Convert.ToInt32(result);
            }

            return request.Id > 0;
        }
        public bool Update(ResourceRequestModel request)
        {
            string query = @"
        UPDATE resource_request
        SET 
            quantity = @Quantity,           
            person_id = @PersonId,
            project_id = @ProjectId,
            instituition_id = @InstituitionId
        WHERE id = @Id;
    ";

            using (MySqlConnection connection = new MySqlConnection(ConnString))
            {
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@Quantity", request.Quantity);
                command.Parameters.AddWithValue("@PersonId", request.PersonId);
                command.Parameters.AddWithValue("@ProjectId", request.ProjectId);
                command.Parameters.AddWithValue("@InstituitionId", request.InstitutionId);
                command.Parameters.AddWithValue("@Id", request.Id);

                connection.Open();
                return command.ExecuteNonQuery() > 0;
            }
        }

        public bool Delete(ResourceRequestModel resource)
        {
            string query = $"DELETE FROM {this.Schema} WHERE id = @id";

            using (MySqlConnection connection = new MySqlConnection(ConnString))
            {
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@id", resource.Id);

                connection.Open();
                return command.ExecuteNonQuery() > 0;

            }
        }


    }
}
