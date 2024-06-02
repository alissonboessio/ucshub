using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UcsHubAPI.Model.Models;

namespace UcsHubAPI.Repository.Repositories
{
    public class ProductionRepository : IRepository<ProductionModel>
    {
        public readonly string ConnString;
        public string Schema { get; }

        public ProductionRepository(string ConnString)
        {
            Schema = "production";
            this.ConnString = ConnString;
        }

        public IEnumerable<ProductionModel> GetAll()
        {
            List<ProductionModel> productions = new List<ProductionModel>();

            string query = $"SELECT * FROM {this.Schema}";

            using (SqlConnection connection = new SqlConnection(ConnString))
            {
                SqlCommand command = new SqlCommand(query, connection);
                connection.Open();

                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    ProductionModel production = new ProductionModel
                    {
                        Id = Convert.ToInt32(reader["id"]),
                        Title = reader["title"].ToString(),
                        Description = reader["description"].ToString(),
                        Type = (Model.Enumerations.ProductionTypeEnum)reader["type"],
                        ProjectId = Convert.ToInt32(reader["project_id"])
                    };

                    productions.Add(production);

                }
            }

            return productions;
        }

        public ProductionModel GetById(int id)
        {
            throw new NotImplementedException();
        }
        public bool Add(ProductionModel user)
        {
            throw new NotImplementedException();
        }
        public bool Update(ProductionModel user)
        {
            throw new NotImplementedException();
        }
        public bool Delete(ProductionModel user)
        {
            throw new NotImplementedException();
        }

    }
}
