using backend.Data;
using backend.ProvModul;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesResultController : ControllerBase
    {
        private readonly DataContext _repository;

        public ImagesResultController(DataContext repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ImagesResult>>> GetImagesResult()
        {
            return await _repository.ImagesResults.ToListAsync();
        }


        
        [HttpPost]
        public async Task <ActionResult> PostImagesResult( [FromBody]ImagesResult newResult)
        {
        
            if (newResult == null)
            {
                return BadRequest("Invalid quiz result data.");
            }

          _repository.ImagesResults.Add(newResult);
            await _repository.SaveChangesAsync();

            return CreatedAtAction(nameof(PostImagesResult), new { id = newResult.Id }, newResult);
        }
    }
}
