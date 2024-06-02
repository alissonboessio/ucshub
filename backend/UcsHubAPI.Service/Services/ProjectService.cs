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

        public ProjectModel GetById(int id)
        {
            ProjectRepository projectRepository = new ProjectRepository(_appSettings.ConnString);

            ProjectModel project = projectRepository.GetById(id);

            if (project == null)
            {
                return null;
            }

            InstitutionService institutionService = new InstitutionService((IOptions<AppSettings>)_appSettings);            

            project.Institution = institutionService.GetById(project.InstitutionId);

            return project;

        }

    }
}
