using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using UcsHubAPI.Model.Enumerations;
using UcsHubAPI.Model.Models;

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

            using (SqlConnection connection = new SqlConnection(ConnString))
            {
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@id", id);
                connection.Open();

                SqlDataReader reader = command.ExecuteReader();
                if (reader.Read())
                {
                    address = new AddressModel
                    {
                        Id = Convert.ToInt32(reader["Id"]),
                        CountryCode = Convert.ToInt32(reader["CountryCode"]),
                        State = reader["State"].ToString(),
                        City = reader["City"].ToString(),
                        District = reader["District"].ToString(),
                        Street = reader["Street"].ToString(),
                        Num = reader["Num"].ToString(),
                        ZipCode = reader["ZipCode"].ToString()
                    };
                }
            }

            return address;
        }

        public bool Add(AddressModel user)
        {
            throw new NotImplementedException();
        }
        public bool Update(AddressModel user)
        {
            throw new NotImplementedException();
        }
        public bool Delete(AddressModel user)
        {
            throw new NotImplementedException();
        }

    }
}
