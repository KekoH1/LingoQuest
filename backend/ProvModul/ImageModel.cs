namespace backend.ProvModul
{
    public class ImageModel
    {
        public int Id { get; set; }
        public string ImagePath { get; set; }
        public string Question { get; set; }
        public List<string> Options { get; set; }
        public string CorrectAnswer { get; set; }
    }

}

