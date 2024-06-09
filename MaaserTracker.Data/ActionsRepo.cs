using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MaaserTracker.Data
{
    public class ActionsRepo
    {
        private readonly string _connectionString;

        public ActionsRepo(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddIncome(Income income)
        {
            using var ctx = new MaaserTrackerDataContext(_connectionString);
            ctx.Incomes.Add(income);
            ctx.SaveChanges();
        }

        public void AddMaaser(Maaser maaser)
        {
            using var ctx = new MaaserTrackerDataContext(_connectionString);
            ctx.Maasers.Add(maaser);
            ctx.SaveChanges();
        }

        public List<Maaser> GetMaasers()
        {
            using var ctx = new MaaserTrackerDataContext(_connectionString);
            return ctx.Maasers.ToList();
        }

        public Overview GetOverview()
        {
            using var ctx = new MaaserTrackerDataContext(_connectionString);
            var overview = new Overview()
            {
                TotalIncome = ctx.Incomes.Sum(i => i.Amount),
                TotalMaaser = ctx.Maasers.Sum(i => i.Amount),
            };

            overview.MaaserObligated = overview.TotalIncome * (decimal).10;
            overview.RemainingMaaser = overview.MaaserObligated - overview.TotalMaaser;

            return overview;
        }
    }
}
