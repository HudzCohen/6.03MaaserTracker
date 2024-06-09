using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MaaserTracker.Data
{
    public class SourceRepo
    {
        private readonly string _connectionString;

        public SourceRepo(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Source> GetSources()
        {
            using var ctx = new MaaserTrackerDataContext(_connectionString);
            return ctx.Sources.ToList();
        }

        public List<Source> GetSourcesWithIncomes()
        {
            using var ctx = new MaaserTrackerDataContext(_connectionString);
            return ctx.Sources.Include(i => i.Incomes).ToList();
        }

        public void AddSource(Source name)
        {
            using var ctx = new MaaserTrackerDataContext(_connectionString);
            ctx.Sources.Add(name);
            ctx.SaveChanges();
        }

        public void DeleteSource(int id)
        {
            using var ctx = new MaaserTrackerDataContext(_connectionString);
            ctx.Incomes.RemoveRange(ctx.Incomes.Where(i => i.SourceId == id));
            ctx.Sources.Remove(ctx.Sources.FirstOrDefault(s => s.Id == id));
            ctx.SaveChanges();
        }

        public void UpdateSource(Source source)
        {
            using var ctx = new MaaserTrackerDataContext(_connectionString);
            ctx.Update(source);
            ctx.SaveChanges();
        }
    }
}
