using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using UcsHubAPI.Response;
using UcsHubAPI.Response.Responses;
using UcsHubAPI.Service.Services;

namespace UcsHubAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly AppSettings _appSettings;
        private readonly UserService _userService;

        public UserController(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
            _userService = new UserService(appSettings);
        }
  
        [HttpGet("Login")]
        [Produces(typeof(BaseResponse))]
        public IActionResult Login()
        {            

            BaseResponse resp = new BaseResponse();

            resp.Success = true;
            resp.Message = "Logado com sucesso";

            return Ok(resp);
        }

    }
}
