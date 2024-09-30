using backend.ProvModul;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class DataContext : DbContext
    {

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {


        }

        public DbSet<Quizs> Quizzes { get; set; }
        public DbSet<Reviews> Reviews { get; set; }
    }
  

}


    
