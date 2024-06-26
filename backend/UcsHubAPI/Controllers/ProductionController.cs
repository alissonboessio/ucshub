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
    public class ProductionController : ControllerBase
    {
        private readonly AppSettings _appSettings;
        private readonly ProductionService _ProductionService;

        public ProductionController(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
            _ProductionService = new ProductionService(appSettings);
        }


        [HttpPost("update")]
        [Produces(typeof(ProductionResponse))]
        public IActionResult Update([FromBody] ProductionUpdateRequest info)
        {

            try
            {
                ProductionResponse resp = new ProductionResponse();
                resp.production = _ProductionService.UpdateProduction(info.Production);

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


        [HttpGet("get_all_list")]
        [Produces(typeof(ProductionListObjResponse))]
        public IActionResult ListAllSimple([FromQuery] string person_id = null, [FromQuery] string title = null)
        {

            try
            {
                ProductionListObjResponse resp = _ProductionService.GetAllSimple(person_id, title);
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
