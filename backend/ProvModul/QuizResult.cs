namespace backend.ProvModul
{
    public class QuizResult
    {
        public int Id { get; set; }

        public int TotalQuestions { get; set; }
        public int CorrectAnswers { get; set; }
        public DateTime SubmittedAt { get; set; } = DateTime.Now;
    }
}
