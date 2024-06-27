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
            string query = @"
            INSERT INTO institution 
            (name, document, address_id) 
            VALUES 
            (@name, @document, @address_id);
            SELECT LAST_INSERT_ID();";

            using (MySqlConnection connection = new MySqlConnection(ConnString))
            {
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@name", institution.Name);
                command.Parameters.AddWithValue("@document", institution.Document);
                command.Parameters.AddWithValue("@address_id", institution.AddressId);

                connection.Open();
                var result = command.ExecuteScalar();
                if (result != null)
                {
                    institution.Id = Convert.ToInt32(result);
                    return true;
                }

                return false;
            }
        }


        public bool Update(InstitutionModel institution)
        {
            string query = @"
    UPDATE institution 
    SET 
        name = @name, 
        document = @document, 
        address_id = @address_id 
    WHERE 
        id = @id";

            using (MySqlConnection connection = new MySqlConnection(ConnString))
            {
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@id", institution.Id);
                command.Parameters.AddWithValue("@name", institution.Name);
                command.Parameters.AddWithValue("@document", institution.Document);
                command.Parameters.AddWithValue("@address_id", institution.AddressId);

                connection.Open();
                int rowsAffected = command.ExecuteNonQuery();

                return rowsAffected > 0;
            }
        }


        public bool Delete(InstitutionModel institution)
        {
            throw new NotImplementedException();
        }
    }
}
