using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Text;
using UcsHubAPI.Request.Requests;
using UcsHubAPI.Response.Responses;
using UcsHubAPI.Service.Services;

namespace UcsHubAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class ProjectController : ControllerBase
    {
        private readonly AppSettings _appSettings;
        private readonly ProjectService _projectService;

        public ProjectController(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
            _projectService = new ProjectService(appSettings);
        }


        [HttpPost("update")]
        [Produces(typeof(ProjectResponse))]
        public IActionResult Update([FromBody] ProjectUpdateRequest info)
        {

            try
            {
                ProjectResponse resp = new ProjectResponse();
                resp.Project = _projectService.UpdateProject(info.Project);

                resp.Success = true;
                resp.Message = "Criado com sucesso";

                return Ok(resp);
            }
            catch (HttpRequestException ex)
            {
                if (ex.StatusCode.HasValue)
                {
                    return StatusCode((int)ex.StatusCode.Value, ex.Message);
                }
                else
                {
                    return BadRequest(ex.Message);
                }
            }
           
        }

    }
}
