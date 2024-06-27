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
    public class HomeController : ControllerBase
    {
        private readonly AppSettings _appSettings;
        private readonly HomeInfoService _homeInfoService;

        public HomeController(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
            _homeInfoService = new HomeInfoService(appSettings);
        }


        [HttpGet("get_indicators")]
        [Produces(typeof(HomeInfoResponse))]
        public IActionResult Update()
        {

            try
            {
                HomeInfoResponse resp = _homeInfoService.GetIndicators();
                

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
