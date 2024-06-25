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

            InstitutionService institutionService = new InstitutionService((IOptions<AppSettings>)_appSettings);            

            project.Institution = institutionService.GetById(project.Institution.Id);

            return project;

        }

    }
}
