using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UcsHubAPI.Model.HelperObjects;
using UcsHubAPI.Model.Models;
using UcsHubAPI.Repository.Repositories;
using UcsHubAPI.Response.Responses;

namespace UcsHubAPI.Service.Services
{
    public class InstitutionService : BaseService
    {

        public InstitutionService(IOptions<AppSettings> appSettings) : base(appSettings)
        {
        }

        public InstitutionModel? GetById(int id)
        {
            InstitutionRepository InstitutionRepository = new InstitutionRepository(_appSettings.ConnString);
            InstitutionModel institution = InstitutionRepository.GetById(id);
                      
            if (institution == null)
            {
                return null;
            }

            AddressService addressService = new AddressService((IOptions<AppSettings>)_appSettings);

            if(institution.AddressId != null)
            {
                institution.Address = addressService.GetById((int)institution.AddressId);

            }


            return institution;

        }

        public ListInstituitionResponse GetAllSimple()
        {
            ListInstituitionResponse response = new ListInstituitionResponse();
            InstitutionRepository institutionRepository = new InstitutionRepository(_appSettings.ConnString);
            List<InstitutionModel> institutions = null;
   
            institutions = (List<InstitutionModel>)institutionRepository.GetAll();


            response.Success = true;
            response.Message = "Encontrados";
            response.Institutions = institutions;

            return response;

        }

    }
}
