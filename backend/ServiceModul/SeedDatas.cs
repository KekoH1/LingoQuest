using backend.Data;
using backend.ProvModul;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace backend.ServiceModul
{
    public class SeedDatas
    {

        public static void Initialize(DataContext context)
        {

            if (!context.Quizzes.Any())
            {
                var quizzes = new List<Quizs>
                {
                    new Quizs
                    {
                        EnglishText = "The cat is sitting comfortably on the roof enjoying the view.",
                        SwedishText = "Katten sitter bekvämt på ___ och njuter av utsikten.",
                        MissingWords = new List<string> { "taket", "golvet", "trädet" }, 
                        CorrectAnswer = "taket"
                    },
                    new Quizs
                    {
                        EnglishText = "I love to eat pasta because it's delicious and easy to make.",
                        SwedishText = "Jag älskar att äta ___ eftersom det är gott och lätt att göra.",
                        MissingWords = new List<string> { "pasta", "pizza", "sushi" }, 
                        CorrectAnswer = "pasta"
                    },
                    new Quizs
                    {
                        EnglishText = "The sky is blue today, with no clouds in sight.",
                        SwedishText = "Himlen är ___ idag, utan några moln i sikte.",
                        MissingWords = new List<string> { "blå", "grön", "grå" }, 
                        CorrectAnswer = "blå"
                    },
                    new Quizs
                    {
                        EnglishText = "She is reading a very interesting book about history.",
                        SwedishText = "Hon läser en mycket intressant ___ om historia.",
                        MissingWords = new List<string> { "bok", "tidning", "tidsskrift" }, 
                        CorrectAnswer = "bok"
                    },
                    new Quizs
                    {
                        EnglishText = "The sun is very bright today, making it hard to see without sunglasses.",
                        SwedishText = "Solen är väldigt ___ idag, vilket gör det svårt att se utan solglasögon.",
                        MissingWords = new List<string> { "ljus", "mörk", "kall" }, 
                        CorrectAnswer = "ljus"
                    },
                    new Quizs
                    {
                        EnglishText = "He is a great teacher who makes learning fun for everyone.",
                        SwedishText = "Han är en fantastisk ___ som gör lärandet roligt för alla.",
                        MissingWords = new List<string> { "lärare", "förare", "sångare" }, 
                        CorrectAnswer = "lärare"
                    },
                    new Quizs
                    {
                        EnglishText = "They went to the park to enjoy the sunny weather and relax.",
                        SwedishText = "De gick till ___ för att njuta av det soliga vädret och koppla av.",
                        MissingWords = new List<string> { "parken", "stranden", "köpcentret" }, 
                        CorrectAnswer = "parken"
                    },
                    new Quizs
                    {
                        EnglishText = "My favorite color is blue, but I also like green and red.",
                        SwedishText = "Min favoritfärg är ___, men jag gillar också grönt och rött.",
                        MissingWords = new List<string> { "blå", "grön", "röd" }, 
                        CorrectAnswer = "blå"
                    },
                    new Quizs
                    {
                        EnglishText = "I enjoy playing soccer with my friends during the weekends.",
                        SwedishText = "Jag gillar att spela ___ med mina vänner under helgerna.",
                        MissingWords = new List<string> { "fotboll", "schack", "gitarr" }, 
                        CorrectAnswer = "fotboll"
                    },
                    new Quizs
                    {
                        EnglishText = "Winter is very cold here, with temperatures often dropping below freezing.",
                        SwedishText = "Vintern är väldigt ___ här, med temperaturer som ofta faller under fryspunkten.",
                        MissingWords = new List<string> { "kall", "het", "regnig" },
                        CorrectAnswer = "kall"
                    }
                };

               
                context.Quizzes.AddRange(quizzes);
            }

            context.SaveChanges();
        }
    }
}
