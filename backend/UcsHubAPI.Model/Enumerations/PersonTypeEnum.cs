
using System.ComponentModel;

namespace UcsHubAPI.Model.Enumerations
{
    public enum PersonTypeEnum
    {
        [Description("Aluno")]
        Student,

        [Description("Professor")]
        Professor,

        [Description("Admin")]
        Admin,

        
    }
}
