using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using UcsHubAPI.Service.Services;

namespace UcsHubAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppSettings _appSettings;
        private readonly UserService _userService;

        public UserController(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
            _userService = new UserService(appSettings);
        }

        [HttpGet("get_by_id")]
        public IActionResult GetById()
        {            
            _userService.GetAll();

            return Ok();
        }
        
        [HttpGet("get_by_name_pwd")]
        public IActionResult GetByNamePassword()
        {            
            _userService.GetAll();

            return Ok();
        }

    }
}
