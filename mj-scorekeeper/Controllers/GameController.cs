using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using mj_scorekeeper.Classes;

namespace mj_scorekeeper.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GameController : ControllerBase
    {
        private readonly DatabaseContext dbContext = new DatabaseContext();

        private readonly ILogger<GameController> _logger;

        public GameController(ILogger<GameController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("new")]
        public string Get()
        {
            Random random = new Random();
            string validCharacters = "abcdefghijklmnopqrstuvwxyz";
            string matchId = "";

            for (int i = 0; i < 5; i++)
            {
                matchId = matchId + validCharacters[random.Next(0, validCharacters.Length)];
            }

            return matchId;
        }

        [HttpPost]
        [Route("create")]
        public void Post([FromBody] Dictionary<string, string> data)
        {
            dbContext.Games.Add(new Game { 
                Date = DateTime.Now,
                GameId = data["matchId"],
                Player1 = data["player1"],
                Player2 = data["player2"],
                Player3 = data["player3"],
                Player4 = data["player4"]
            });
        }
    }
}
