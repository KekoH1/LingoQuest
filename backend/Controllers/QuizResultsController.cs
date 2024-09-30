using backend.Data;
using backend.ProvModul;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizResultsController : ControllerBase
    {
        private readonly DataContext _context;

        public QuizResultsController(DataContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<QuizResult>>> GetQuizResults()
        {
            return await _context.QuizResults.ToListAsync();
        }


        [HttpPost]
        public async Task<IActionResult> PostQuizResult([FromBody] QuizResult quizResult)
        {
            if (quizResult == null)
            {
                return BadRequest("Invalid quiz result data.");
            }

            _context.QuizResults.Add(quizResult);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(PostQuizResult), new { id = quizResult.Id }, quizResult);
        }
    }
}
