using MaaserTracker.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactMaaserTrackerMUI_Starter.Web.Models;

namespace ReactMaaserTrackerMUI_Starter.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActionsController : ControllerBase
    {
        private readonly string _connectionString;

        public ActionsController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost("addincome")]
        public void AddIncome(Income income)
        {
            var repo = new ActionsRepo(_connectionString);
            repo.AddIncome(income);
        }

        [HttpPost("addmaaser")]
        public void AddMaaser(Maaser maaser)
        {
            var repo = new ActionsRepo(_connectionString);
            repo.AddMaaser(maaser);
        }

        [HttpGet("getmaasers")]
        public List<Maaser> GetMaasers()
        {
            var repo = new ActionsRepo(_connectionString);
            return repo.GetMaasers();
        }

        [HttpGet("overview")]
        public Overview GetOverview()
        {
            var repo = new ActionsRepo(_connectionString);
            return repo.GetOverview();
        }

     
    }
}
