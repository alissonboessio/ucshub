using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using UcsHubAPI.Model.Models;
using UcsHubAPI.Request.Requests;
using UcsHubAPI.Response;
using UcsHubAPI.Response.Responses;
using UcsHubAPI.Service.Services;

namespace UcsHubAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class KnowledgeAreaController : ControllerBase
    {
        private readonly AppSettings _appSettings;
        private readonly KnowledgeAreaService _knowledgeAreaService;

        public KnowledgeAreaController(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
            _knowledgeAreaService = new KnowledgeAreaService(appSettings);
        }
  
    
        [HttpGet("get_all")]
        [Produces(typeof(ListKnowledgeAreaResponse))]
        public IActionResult GetAll()
        {
            try
            {
                ListKnowledgeAreaResponse resp = _knowledgeAreaService.GetAll();
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
