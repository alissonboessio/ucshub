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
    public class InstitutionController : ControllerBase
    {
        private readonly AppSettings _appSettings;
        private readonly InstitutionService _institutionService;

        public InstitutionController(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
            _institutionService = new InstitutionService(appSettings);
        }
  
        [HttpGet("get_all")]
        [Produces(typeof(ListInstituitionResponse))]
        public IActionResult GetAll()
        {

            try
            {
                ListInstituitionResponse resp = _institutionService.GetAllSimple();
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
