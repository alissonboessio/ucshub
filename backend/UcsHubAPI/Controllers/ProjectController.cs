using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
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
            _ProductionService.GetAll();

            return Ok();
        }

    }
}
