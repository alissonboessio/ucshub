using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Text;
using UcsHubAPI.Request;
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
    
        [HttpGet("get_by_id/{id}")]
        [Produces(typeof(ProjectResponse))]
        public IActionResult GetById(int id)
        {

            try
            {
                ProjectResponse resp = new ProjectResponse();
                resp.Project = _projectService.GetById(id);

                resp.Success = true;
                resp.Message = "Encontrado!";

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

        [HttpGet("get_all_list")]
        [Produces(typeof(ProjectListObjResponse))]
        public IActionResult ListAllSimple([FromQuery] string person_id = null, [FromQuery] string title = null)
        {

            try
            {
                ProjectListObjResponse resp = _projectService.GetAllSimple(person_id, title);
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
        
        [HttpDelete("delete/{id}")]
        [Produces(typeof(ProjectResponse))]
        public IActionResult Delete(int id)
        {

            try
            {
                ProjectResponse resp = new ProjectResponse();

                resp.Success = _projectService.Delete(id);
                resp.Message = "Deletado!";

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
