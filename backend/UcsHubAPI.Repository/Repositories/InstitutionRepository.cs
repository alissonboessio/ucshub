using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UcsHubAPI.Model.Models;

namespace UcsHubAPI.Repository.Repositories
{
    public class InstitutionRepository : IRepository<InstitutionModel>
    {
        public readonly string ConnString;
        public string Schema { get; }

        public InstitutionRepository(string ConnString)
        {
            Schema = "institution";
            this.ConnString = ConnString;
        }

        public IEnumerable<InstitutionModel> GetAll()
        {
            throw new NotImplementedException();
        }

        public InstitutionModel? GetById(int id)
        {
            
            InstitutionModel institution = null;

            string query = $"SELECT * FROM {this.Schema} WHERE id = @id";

            using (SqlConnection connection = new SqlConnection(ConnString))
            {
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@Id", id);
                connection.Open();

                SqlDataReader reader = command.ExecuteReader();
                if (reader.Read())
                {
                    institution = new InstitutionModel
                    {
                        Id = Convert.ToInt32(reader["Id"]),
                        Name = reader["Name"].ToString(),
                        Document = reader["Document"].ToString(),
                        CreatedAt = Convert.ToDateTime(reader["CreatedAt"]),
                        AddressId = Convert.ToInt32(reader["AddressId"])
                    };
                }
            }

            return institution;
        }
        public bool Add(InstitutionModel user)
        {
            throw new NotImplementedException();
        }
        public bool Update(InstitutionModel user)
        {
            throw new NotImplementedException();
        }
        public bool Delete(InstitutionModel user)
        {
            throw new NotImplementedException();
        }

    }
}
