using backend.Data;
using backend.ProvModul;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GrammaticResultController : ControllerBase
    {
        private readonly DataContext _context;

        public GrammaticResultController(DataContext context)
        {
            _context = context;
        }

     
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GrammaticResult>>> GetGrammaticResults()
        {
            return await _context.GrammaticResults.ToListAsync();
        }

   
        [HttpPost]
        public async Task<IActionResult> PostGrammaticResult([FromBody] GrammaticResult grammaticResult)
        {
            if (grammaticResult == null)
            {
                return BadRequest("Invalid grammatic result data.");
            }

            _context.GrammaticResults.Add(grammaticResult);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(PostGrammaticResult), new { id = grammaticResult.Id }, grammaticResult);
        }
    }
}
