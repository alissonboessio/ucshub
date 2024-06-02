
using System.ComponentModel;

namespace UcsHubAPI.Model.Enumerations
{
    public enum TitulationEnum
    {
        [Description("Graduação")]
        Undergraduate,

        [Description("Especialização")]
        Specialization,

        [Description("Mestrado")]
        Master,

        [Description("Doutorado")]
        Doctorate
        
    }
}
