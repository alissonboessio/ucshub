using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Resources;
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
        
        public InstitutionModel? UpdateInstitution(InstitutionModel inst)
        {
            InstitutionRepository institutionRepository = new InstitutionRepository(_appSettings.ConnString);

            bool ok = false;

            try
            {
                if (inst.Id != null)
                {
                    ok = institutionRepository.Update(inst);

                }
                else
                {
                    ok = institutionRepository.Add(inst);
                }

            }
            catch (Exception e)
            {
                throw new HttpRequestException(message: "Instituição não atualizada!", e.InnerException, statusCode: System.Net.HttpStatusCode.BadRequest);
            }


            if (!ok)
            {
                throw new HttpRequestException(message: "Instituição não atualizada!", null, statusCode: System.Net.HttpStatusCode.BadRequest);
            }

            return institutionRepository.GetById((int)inst.Id);

        }

    }
}
