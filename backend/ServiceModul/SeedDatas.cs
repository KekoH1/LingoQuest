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

         
            if (!context.GrammarQuiz.Any())
            {
                var grammarQuiz = new List<GrammarQuiz>
                {
                    new GrammarQuiz
                    {
                        Question = "Which of the following sentences is grammatically correct?",
                        Options = new List<string>
                        {
                            "She don't like apples.",
                            "She doesn't likes apples.",
                            "She doesn't like apples.",
                            "She isn't like apples."
                        },
                        CorrectAnswer = "She doesn't like apples."
                    },
                    new GrammarQuiz
                    {
                        Question = "Choose the correct form of the verb in the following sentence: 'Neither of the students _____ finished their work.'",
                        Options = new List<string> { "has", "have", "is", "are" },
                        CorrectAnswer = "has"
                    },
                    new GrammarQuiz
                    {
                        Question = "Which sentence uses the correct conditional tense?",
                        Options = new List<string>
                        {
                            "If I knew the answer, I would have told you.",
                            "If I know the answer, I will have told you.",
                            "If I had known the answer, I would tell you.",
                            "If I had known the answer, I would have told you."
                        },
                        CorrectAnswer = "If I had known the answer, I would have told you."
                    },
                    new GrammarQuiz
                    {
                        Question = "Which sentence contains a dangling modifier?",
                        Options = new List<string>
                        {
                            "Running quickly, the finish line seemed close.",
                            "Running quickly, she reached the finish line.",
                            "She was running quickly to the finish line.",
                            "The finish line was reached by her running quickly."
                        },
                        CorrectAnswer = "Running quickly, the finish line seemed close."
                    },
                    new GrammarQuiz
                    {
                        Question = "What is the correct usage of 'who' and 'whom' in the following sentence? 'To _____ did you give the book?'",
                        Options = new List<string> { "who", "whom", "whoever", "whomever" },
                        CorrectAnswer = "whom"
                    },
                    new GrammarQuiz
                    {
                        Question = "Which of the following sentences correctly uses a semicolon?",
                        Options = new List<string>
                        {
                            "I have a big exam tomorrow; I can't go out tonight.",
                            "I have a big exam tomorrow; because of that, I can't go out tonight.",
                            "I have a big exam tomorrow; and I can't go out tonight.",
                            "I have a big exam tomorrow; but I can't go out tonight."
                        },
                        CorrectAnswer = "I have a big exam tomorrow; I can't go out tonight."
                    },
                    new GrammarQuiz
                    {
                        Question = "Identify the sentence with the correct subject-verb agreement.",
                        Options = new List<string>
                        {
                            "The group of students are working on their project.",
                            "The group of students is working on their project.",
                            "The group of students were working on their project.",
                            "The group of students has been working on their project."
                        },
                        CorrectAnswer = "The group of students is working on their project."
                    },
                    new GrammarQuiz
                    {
                        Question = "Which of the following sentences is in the passive voice?",
                        Options = new List<string>
                        {
                            "The chef prepared the meal.",
                            "The meal was prepared by the chef.",
                            "The chef is preparing the meal.",
                            "The meal is preparing by the chef."
                        },
                        CorrectAnswer = "The meal was prepared by the chef."
                    },
                    new GrammarQuiz
                    {
                        Question = "What is the correct plural form of 'analysis'?",
                        Options = new List<string> { "analysis's", "analysises", "analyses", "analysis" },
                        CorrectAnswer = "analyses"
                    },
                    new GrammarQuiz
                    {
                        Question = "In which sentence is 'fewer' used correctly?",
                        Options = new List<string>
                        {
                            "I have fewer water than you.",
                            "There are fewer students in the class today.",
                            "Fewer people are attending the concert than last year.",
                            "The fewer cars on the road, the better the traffic will be."
                        },
                        CorrectAnswer = "There are fewer students in the class today."
                    }
                };

                context.GrammarQuiz.AddRange(grammarQuiz);
            }

            if (!context.ImageModels.Any())
            {
                var imageModels = new List<ImageModel>
                {
                    new ImageModel
                    {
                        Id = 1,
                        ImagePath = "image1.jpg",
                        Question = "What is in this image?",
                        Options = new List<string> { "Cat", "Dog", "Car", "House" },
                        CorrectAnswer = "Dog"
                    },
                    new ImageModel
                    {
                        Id = 2,
                        ImagePath = "image2.jpg",
                        Question = "What type of vehicle is this?",
                        Options = new List<string> { "Bicycle", "Boat", "Car", "Airplane" },
                        CorrectAnswer = "Car"
                    },
                    new ImageModel
                    {
                        Id = 3,
                        ImagePath = "image3.jpg",
                        Question = "What does this image show?",
                        Options = new List<string> { "Flower", "Tree", "Bus", "House" },
                        CorrectAnswer = "Flower"
                    },
                    new ImageModel
                    {
                        Id = 4,
                        ImagePath = "image4.jpg",
                        Question = "What fruit is shown in the image?",
                        Options = new List<string> { "Apple", "Banana", "Grape", "Orange" },
                        CorrectAnswer = "Banana"
                    },
                    new ImageModel
                    {
                        Id = 5,
                        ImagePath = "image5.jpg",
                        Question = "What type of animal is this?",
                        Options = new List<string> { "Dog", "Fish", "Bird", "Cat" },
                        CorrectAnswer = "Cat"
                    },
                    new ImageModel
                    {
                        Id = 6,
                        ImagePath = "image6.jpg",
                        Question = "What is the name of this vehicle?",
                        Options = new List<string> { "Train", "Bus", "Car", "Bicycle" },
                        CorrectAnswer = "Bus"
                    },
                    new ImageModel
                    {
                        Id = 7,
                        ImagePath = "image7.jpg",
                        Question = "What drink is this?",
                        Options = new List<string> { "Coffee", "Tea", "Water", "Juice" },
                        CorrectAnswer = "Tea"
                    },
                    new ImageModel
                    {
                        Id = 8,
                        ImagePath = "image8.jpg",
                        Question = "What is this object?",
                        Options = new List<string> { "Pen", "Notebook", "Computer", "Phone" },
                        CorrectAnswer = "Computer"
                    },
                    new ImageModel
                    {
                        Id = 9,
                        ImagePath = "image9.jpg",
                        Question = "What type of nature is shown here?",
                        Options = new List<string> { "Ocean", "Mountain", "Forest", "Desert" },
                        CorrectAnswer = "Forest"
                    },
                    new ImageModel
                    {
                        Id = 10,
                        ImagePath = "image10.jpg",
                        Question = "Which sports tool is shown in the image?",
                        Options = new List<string> { "Football", "Tennis racket", "Basketball", "Golf club" },
                        CorrectAnswer = "Tennis racket"
                    }
                };

                context.ImageModels.AddRange(imageModels);
            }

            context.SaveChanges();
        }
    }
}
