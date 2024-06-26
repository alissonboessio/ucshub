﻿using Microsoft.AspNetCore.Authorization;
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
    public class PersonController : ControllerBase
    {
        private readonly AppSettings _appSettings;
        private readonly PersonService _PersonService;

        public PersonController(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
            _PersonService = new PersonService(appSettings);
        }
  
    
        [HttpGet("get_all")]
        [Produces(typeof(ListPersonResponse))]
        public IActionResult GetAll()
        {
            try
            {
                ListPersonResponse resp = _PersonService.GetAll();
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
