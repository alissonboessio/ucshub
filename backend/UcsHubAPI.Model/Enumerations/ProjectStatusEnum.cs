
using System.ComponentModel;

namespace UcsHubAPI.Model.Enumerations
{
    public enum ProjectStatusEnum
    {
        [Description("Criado")]
        created,

        [Description("Em Andamento")]
        ongoing,
        
        [Description("Finalizado")]
        ended,

        
    }
}
