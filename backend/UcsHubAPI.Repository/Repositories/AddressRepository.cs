using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using UcsHubAPI.Model.Models;
using UcsHubAPI.Shared;

namespace UcsHubAPI.Repository.Repositories
{
    public class AddressRepository : IRepository<AddressModel>
    {
        public readonly string ConnString;
        public string Schema { get; }

        public AddressRepository(string ConnString)
        {
            Schema = "address";
            this.ConnString = ConnString;
        }

        public IEnumerable<AddressModel> GetAll()
        {
            throw new NotImplementedException();
        }

        public AddressModel GetById(int id)
        {
            AddressModel address = null;

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
                        address = new AddressModel
                        {
                            Id = reader.GetInt32("id"),
                            CountryCode = reader.GetInt32("country_code"),
                            State = reader.GetStringH("state"),
                            City = reader.GetStringH("city"),
                            District = reader.GetStringH("district"),
                            Street = reader.GetStringH("street"),
                            Num = reader.GetStringH("num"),
                            ZipCode = reader.GetStringH("zip_code")
                        };
                    }
                }
            }

            return address;
        }

        public bool Add(AddressModel address)
        {
            throw new NotImplementedException();
        }

        public bool Update(AddressModel address)
        {
            throw new NotImplementedException();
        }

        public bool Delete(AddressModel address)
        {
            throw new NotImplementedException();
        }
    }
}
