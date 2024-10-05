using backend.Data;
using backend.ProvModul;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class StatisticsController : ControllerBase
{
    private readonly DataContext _context;

    public StatisticsController(DataContext context)
    {
        _context = context;
    }

    [HttpGet("GetStatistics")]
    public async Task<ActionResult<TotalResult>> GetStatistics()
    {
        var quizResult = await _context.QuizResults.ToListAsync();
        var gramResults = await _context.GrammaticResults.ToListAsync();
        var imageResults = await _context.ImagesResults.ToListAsync();

        var totalScore = quizResult.Sum(questions => questions.CorrectAnswers) +
                         gramResults.Sum(questions => questions.CorrectAnswers) +
                         imageResults.Sum(questions => questions.CorrectAnswers);
        var totalAttempts = quizResult.Count + gramResults.Count + imageResults.Count;

        var result = new TotalResult
        {
            TotalScore = totalScore,
            TotalAttempts = totalAttempts
        };
        return Ok(result);
    }

    [HttpGet("GetStatisticsByCategory")]
    public async Task<ActionResult<CategoryResults>> GetStatisticsByCategory()
    {
        var quizResult = await _context.QuizResults.ToListAsync();
        var gramResults = await _context.GrammaticResults.ToListAsync();
        var imageResults = await _context.ImagesResults.ToListAsync();

        var ResultsCategory = new List<CategoryResults>
        {
            new CategoryResults
            {
                CategoryName = "Quiz resultat",
                TotalAttempts = quizResult.Count,
                TotalScore = quizResult.Sum(questions => questions.CorrectAnswers)
            },
            new CategoryResults
            {
                CategoryName = "grammatisk resultat",
                TotalAttempts = gramResults.Count,
                TotalScore = gramResults.Sum(questions => questions.CorrectAnswers)
            },
            new CategoryResults
            {
                CategoryName = "Bildresultat",
                TotalAttempts = imageResults.Count,
                TotalScore = imageResults.Sum(questions => questions.CorrectAnswers)
            },
        };
        return Ok(ResultsCategory);
    }
}