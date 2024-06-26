using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UcsHubAPI.Model.Enumerations;
using UcsHubAPI.Model.Models;

namespace UcsHubAPI.Model.HelperObjects
{
    public class ProjectsListObj
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime DateCreated { get; set; }
        public List<string> people { get; set; }
        public List<PersonModel> peoplemodel { get; set; }

        public ProjectsListObj()
        {
            people = new List<string>();
            peoplemodel = new List<PersonModel>();
        }
    }
}
