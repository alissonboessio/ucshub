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
        [Produces(typeof(UserResponse))]
        public IActionResult Login()
        {

            Request.Headers.TryGetValue("Authorization", out var authHeader);           
            var encodedCredentials = authHeader.ToString().Substring(6);
            var decodedCredentials = Encoding.UTF8.GetString(Convert.FromBase64String(encodedCredentials));

            var email = decodedCredentials.Split(':')[0];
            var password = decodedCredentials.Split(':')[1];             

            UserResponse resp = new UserResponse();

            resp.Success = true;
            resp.Message = "Logado com sucesso";
            resp.User = _userService.AuthenticateUser(email, password);

            return Ok(resp);
        }
        
        [HttpPost("register")]
        [Produces(typeof(UserResponse))]
        [ProducesResponseType(typeof(UserResponse), 201)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(typeof(string), 500)]
        [AllowAnonymous]
        public IActionResult SignUp([FromBody] UsuarioSignUpRequest info)
        {

            try
            {
                UserResponse resp = new UserResponse();
                resp.User = _userService.CreateUser(info.name, info.email, info.password);

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
