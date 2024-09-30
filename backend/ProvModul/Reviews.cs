using System.ComponentModel.DataAnnotations;

namespace backend.ProvModul
{
    public class Reviews
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }
    }
}
