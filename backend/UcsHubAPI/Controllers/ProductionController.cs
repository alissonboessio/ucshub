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


        [HttpGet("get_by_id/{id}")]
        [Produces(typeof(ProductionResponse))]
        public IActionResult GetById(int id)
        {

            try
            {
                ProductionResponse resp = new ProductionResponse();
                resp.production = _ProductionService.GetById(id);

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

        [HttpDelete("delete/{id}")]
        [Produces(typeof(BaseResponse))]
        public IActionResult Delete(int id)
        {

            try
            {
                BaseResponse resp = new BaseResponse();

                resp.Success = _ProductionService.Delete(id);
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
