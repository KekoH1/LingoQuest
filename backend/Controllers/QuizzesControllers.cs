using backend.Data;
using backend.ProvModul;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizzesControllers : ControllerBase
    {
        private readonly DataContext _context;

        public QuizzesControllers(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Quizs>>> GetQuizzes()
        {
            return await _context.Quizzes.ToListAsync();
        }
    }
}
