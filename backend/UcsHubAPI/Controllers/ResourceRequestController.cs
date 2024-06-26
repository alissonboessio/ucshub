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
    public class ResourceRequestController : ControllerBase
    {
        private readonly AppSettings _appSettings;
        private readonly ResourceRequestService _resourceRequestService;

        public ResourceRequestController(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
            _resourceRequestService = new ResourceRequestService(appSettings);
        }


        [HttpPost("update")]
        [Produces(typeof(ResourceRequestResponse))]
        public IActionResult Update([FromBody] ResourceRequestUpdateRequest info)
        {

            try
            {
                ResourceRequestResponse resp = new ResourceRequestResponse();
                resp.ResourceRequest = _resourceRequestService.UpdateResourceRequest(info.ResourceRequest);

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
