using backend.Data;
using backend.ProvModul;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly DataContext _context;

        public ImageController(DataContext context)
        {
            _context = context;
        }

       
        [HttpGet]
        public async Task<ActionResult<List<ImageModel>>> GetImages()
        { 
            var images = await _context.ImageModels.ToListAsync();
            return Ok(images);
        }
    }
}
