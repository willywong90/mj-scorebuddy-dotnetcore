using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using mj_scorekeeper.Classes;

namespace mj_scorekeeper.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ApiController : ControllerBase
    {
        private readonly DatabaseContext dbContext = new DatabaseContext();

        private readonly ILogger<GameController> _logger;

        public ApiController(ILogger<GameController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        [Route("game/new")]
        public IActionResult newGame([FromBody] Game game)
        {
            string gameId = Utilities.createGameId();

            game.GameId = gameId;

            dbContext.Games.Add(game);
            dbContext.SaveChanges();

            return Created($"/game/{gameId}", game);
        }

        [HttpGet]
        [Route("game/{gameId}")]
        public IActionResult game(string gameId)
        {
            Game game = dbContext.Games.Include(s => s.Hands).Where(s => s.GameId == gameId.ToUpper()).FirstOrDefault();

            if (game != null)
            {
                return Ok(game);
            }

            return NotFound();
        }

        [HttpPost]
        [Route("game/{gameId}/score/add")]
        public IActionResult addScore([FromBody] Score hand)
        {
            hand.GameId = hand.GameId.ToUpper();
            string gameId = hand.GameId;

            Game game = dbContext.Games.FirstOrDefault(s => s.GameId == gameId);

            if (game == null)
            {
                return BadRequest("Error: GameId is invalid.");
            }

            dbContext.Hands.Add(hand);

            game.Hands.Add(hand);
            dbContext.SaveChanges();

            return Created($"/game/{hand.GameId}/score/", hand);
        }
    }
}
