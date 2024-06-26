using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UcsHubAPI.Model.Models;

namespace UcsHubAPI.Response.Responses
{
    public class ListPersonResponse : BaseResponse
    {
        public List<PersonModel> People { get; set; }


    }
}
