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
    public class ProjectService : BaseService
    {

        public ProjectService(IOptions<AppSettings> appSettings) : base(appSettings)
        {
        }


        public ProjectModel? UpdateProject(ProjectModel Project)
        {
            ProjectRepository projectRepository = new ProjectRepository(_appSettings.ConnString);

            bool ok = false;

            try
            {
                if (Project.Id != null)
                {
                    ok = projectRepository.Update(Project);

                }
                else
                {
                    ok = projectRepository.Add(Project);
                }

                if (Project.Authors != null && Project.Authors.Count > 0)
                {
                    ok = projectRepository.UpdateAuthors(Project.Authors, Project);
                }

            }
            catch (Exception e)
            {
                throw new HttpRequestException(message: "Projeto não atualizado!", e.InnerException, statusCode: System.Net.HttpStatusCode.BadRequest);
            }


            if (!ok)
            {
                throw new HttpRequestException(message: "Projeto não atualizado!", null, statusCode: System.Net.HttpStatusCode.BadRequest);
            }

            return projectRepository.GetById((int)Project.Id);

        }


        public ProjectModel GetById(int id)
        {
            ProjectRepository projectRepository = new ProjectRepository(_appSettings.ConnString);

            ProjectModel project = projectRepository.GetById(id);

            if (project == null)
            {
                return null;
            }

            InstitutionRepository InstitutionRepository = new InstitutionRepository(_appSettings.ConnString);
            project.Institution = InstitutionRepository.GetById(project.Institution.Id);


            ProductionRepository productionRepository = new ProductionRepository(_appSettings.ConnString);
            project.Productions = (List<ProductionModel>)productionRepository.GetAllByProjectId((int)project.Id);

            return project;

        }

        
        public bool Delete(int id)
        {
            ProjectRepository projectRepository = new ProjectRepository(_appSettings.ConnString);

            ProjectModel project = projectRepository.GetById(id);

            if (project == null)
            {
                throw new HttpRequestException("Projeto não encontrado!", null, System.Net.HttpStatusCode.NotFound);
            }
            
            UserRepository UserRepository = new UserRepository(_appSettings.ConnString);


            return projectRepository.Delete(project);



        }


        public ProjectListObjResponse GetAllSimple(string person_id = null, string title = null)
        {
            ProjectListObjResponse response = new ProjectListObjResponse();
            ProjectRepository projectRepository = new ProjectRepository(_appSettings.ConnString);
            List<ProjectsListObj> projects = null;
            if (!string.IsNullOrEmpty(person_id) || !string.IsNullOrEmpty(title))
            {

                if (Int32.TryParse(person_id, out int id))
                {
                    PersonModel Person = new PersonRepository(_appSettings.ConnString).GetById(id);
                    projects = (List<ProjectsListObj>)projectRepository.GetAllSimpleFiltered(Person);

                }
                else
                {
                    throw new HttpRequestException("Filtro formatado errado!", null, System.Net.HttpStatusCode.BadRequest);
                }


            }
            else
            {
                throw new HttpRequestException("Filtro formatado errado!", null, System.Net.HttpStatusCode.BadRequest);
                //projects = (List<ProductionListObj>)projectRepository.GetAllSimple();

            }


            response.Success = true;
            response.Message = "Encontrados";
            response.Projects = projects;

            return response;

        }

    }
}
