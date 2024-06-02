using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using UcsHubAPI.Model.Models;
using UcsHubAPI.Response;
using UcsHubAPI.Response.Responses;
using UcsHubAPI.Service.Services;

namespace UcsHubAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class ProductionController : ControllerBase
    {
        private readonly AppSettings _appSettings;
        private readonly ProductionService _ProductionService;

        public ProductionController(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
            _ProductionService = new ProductionService(appSettings);
        }
  
        [HttpGet("list_all")]
        public IActionResult ListAll()
        {

            ListProductionResponse resp = _ProductionService.GetAll();

            if (resp.Success)
            {
                return Ok(resp);
            }

            return BadRequest(resp);
            
        }
        [HttpGet("get_all_list")]
        [Produces(typeof(ProductionListObjResponse))]
        public IActionResult ListAllSimple()
        {

            ProductionListObjResponse resp = _ProductionService.GetAllSimple();

            if (!resp.Success)
            {
                return BadRequest(resp);
                
            }

            if (resp.Productions.Any())
            {
                return Ok(resp);
            }
            else
            {
                return NoContent();
            }
            
            
        }

    }
}
