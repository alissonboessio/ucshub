using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using UcsHubAPI.Model.Models;
using UcsHubAPI.Shared;

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
            List<InstitutionModel> institutions = new List<InstitutionModel>();

            string query = $"SELECT * FROM {this.Schema}";

            using (MySqlConnection connection = new MySqlConnection(ConnString))
            {
                MySqlCommand command = new MySqlCommand(query, connection);
                connection.Open();

                MySqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    InstitutionModel institution = new InstitutionModel
                    {
                        Id = reader.GetInt32("id"),
                        Name = reader.GetStringH("name"),
                        Document = reader.GetStringH("document"),
                        CreatedAt = (DateTime)reader.GetDateTimeH("created_at")!,
                        AddressId = reader.GetIntH("address_id")
                    };

                    institutions.Add(institution);

                }
            }

            return institutions;
        }


        public InstitutionModel GetById(int id)
        {
            InstitutionModel institution = null;

            string query = $"SELECT * FROM {this.Schema} WHERE id = @id";

            using (MySqlConnection connection = new MySqlConnection(ConnString))
            {
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@id", id);
                connection.Open();

                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        institution = new InstitutionModel
                        {
                            Id = reader.GetInt32("id"),
                            Name = reader.GetStringH("name"),
                            Document = reader.GetStringH("document"),
                            CreatedAt = reader.GetDateTime("created_at"),
                            AddressId = reader.GetIntH("address_id")
                        };
                    }
                }
            }

            return institution;
        }

        public bool Add(InstitutionModel institution)
        {
            throw new NotImplementedException();
        }

        public bool Update(InstitutionModel institution)
        {
            throw new NotImplementedException();
        }

        public bool Delete(InstitutionModel institution)
        {
            throw new NotImplementedException();
        }
    }
}
