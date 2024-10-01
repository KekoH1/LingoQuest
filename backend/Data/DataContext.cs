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
        public DbSet<QuizResult> QuizResults { get; set; }
        public DbSet<GrammarQuiz> GrammarQuiz { get; set; }
        public DbSet<GrammaticResult> GrammaticResults { get; set; }
        public DbSet<ImageModel> ImageModels { get; set; }
        public DbSet<ImagesResult> ImagesResults { get; set; }

    }
}


    
