using backend.Data;
using backend.ProvModul;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq; // Se till att inkludera System.Linq för ToList()

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly DataContext _context;

        public ReviewsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllReviews()
        {
            var reviews = _context.Reviews.ToList(); // Hämtar alla reviews
            return Ok(reviews);
        }

        [HttpGet("{id}")]
        public IActionResult GetReview(int id)
        {
            var review = _context.Reviews.Find(id); // Hämtar review baserat på ID
            if (review == null)
            {
                return NotFound();
            }
            return Ok(review);
        }

        [HttpPost]
        public IActionResult CreateReview([FromBody] Reviews review) // Bytte Review till Reviews
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Reviews.Add(review); // Lägger till review
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetReview), new { id = review.Id }, review); // Returnerar den skapade review
        }

        
        [HttpDelete("all")]
        public IActionResult DeleteAllReviews()
        {
            var reviews = _context.Reviews.ToList();
            if (!reviews.Any())
            {
                return NotFound();
            }

            _context.Reviews.RemoveRange(reviews);
            _context.SaveChanges();

            return NoContent();
        }



    }
}
