using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UcsHubAPI.Model.Models;
using UcsHubAPI.Repository.Repositories;

namespace UcsHubAPI.Service.Services
{
    public class AddressService : BaseService
    {

        public AddressService(IOptions<AppSettings> appSettings) : base(appSettings)
        {
        }

        public AddressModel GetById(int id)
        {
            AddressRepository AddressRepository = new AddressRepository(_appSettings.ConnString);

            AddressModel Address = AddressRepository.GetById(id);

            if (Address == null)
            {
                return null;
            }           

            return Address;

        }

    }
}
