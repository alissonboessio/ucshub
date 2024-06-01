using Microsoft.AspNetCore.Mvc;
using UcsHubAPI.Service.Services;

namespace UcsHubAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ConfigSettings _configSettings;
        private readonly UserService _userService;

        public UserController()
        {
            _configSettings = new ConfigSettings();
            _userService = new UserService();
        }

        [HttpGet]
        public IActionResult Get()
        {
            
            _userService.GetAll();

            // Return response
            return Ok();
        }

    }
}
