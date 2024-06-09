using MaaserTracker.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactMaaserTrackerMUI_Starter.Web.Models;

namespace ReactMaaserTrackerMUI_Starter.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SourceController : ControllerBase
    {
        private readonly string _connectionString;

        public SourceController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet("getsources")]
        public List<Source> GetSources()
        {
            var repo = new SourceRepo(_connectionString);
            return repo.GetSources();
        }

        [HttpGet("getsourceswithincomes")]
        public List<Source> GetSourcesWithIncomes()
        {
            var repo = new SourceRepo(_connectionString);
            return repo.GetSourcesWithIncomes();
        }

        [HttpPost("addsource")]
        public void AddSource(Source source)
        {
            var repo = new SourceRepo(_connectionString);
            repo.AddSource(source);
        }

        [HttpPost("deletesource")]
        public void DeleteSource(SourceViewModel sourceViewModel)
        {
            var repo = new SourceRepo(_connectionString);
            repo.DeleteSource(sourceViewModel.Id);
        }

        [HttpPost("editsource")]
        public void UpdateSource(Source source)
        {
            var repo = new SourceRepo(_connectionString);
            repo.UpdateSource(source);
        }

    }
}
