using backend.Data;
using backend.ProvModul;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GrammarQuizController : ControllerBase
    {
        private readonly DataContext _context;

        public GrammarQuizController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GrammarQuiz>>> GetGrammarQuizzes()
        {
          
            return await _context.GrammarQuiz.ToListAsync();
        }
    }
}
