namespace backend.ProvModul
{
    public class GrammarQuiz
    {
        public int id { get; set; }
        public string Question { get; set; }
        public List<string> Options { get; set; }
        public string CorrectAnswer { get; set; }
    }
}
