using Microsoft.Extensions.Options;

namespace UcsHubAPI.Service
{
    public class BaseService
    {
        protected readonly AppSettings _appSettings;

        protected BaseService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

    }
}
