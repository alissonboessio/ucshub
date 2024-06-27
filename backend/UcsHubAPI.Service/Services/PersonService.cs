using Microsoft.Extensions.Options;
using UcsHubAPI.Model.Models;
using UcsHubAPI.Repository.Repositories;
using UcsHubAPI.Response.Responses;

namespace UcsHubAPI.Service.Services
{
    public class PersonService : BaseService
    {
        public PersonService(IOptions<AppSettings> appSettings) : base(appSettings)
        {            
        }
             
        public ListPersonResponse GetAll() {
            ListPersonResponse response = new ListPersonResponse();
            PersonRepository personRepository = new PersonRepository(_appSettings.ConnString);
            List<PersonModel> people = null;

            people = (List<PersonModel>)personRepository.GetAll();

            if(people.Count == 0)
            {
                throw new HttpRequestException("Nenhuma Pessoa Encontrada!", null, System.Net.HttpStatusCode.NoContent);
            }

            InstitutionRepository institutionsRepository = new InstitutionRepository(_appSettings.ConnString);
            KnowledgeAreaRepository knowledgeAreaRepository = new KnowledgeAreaRepository(_appSettings.ConnString);

            foreach (PersonModel person in people)
            {
                if (person.InstitutionId != null)
                {
                    person.Institution = institutionsRepository.GetById((int)person.InstitutionId);

                }

                if (person.KnowledgeAreaId != null)
                {
                    person.KnowledgeArea = knowledgeAreaRepository.GetById((int)person.KnowledgeAreaId);
                    if(person.KnowledgeArea != null)
                    {
                        person.KnowledgeArea.KnowledgeParentarea = null;
                    }

                }
            }

            response.Success = true;
            response.Message = "Encontrados";
            response.People = people;

            return response;

        }


    }
}
