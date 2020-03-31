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

        [HttpGet]
        [Route("game")]
        public IActionResult getGames(int limit = 5)
        {
            Game[] games = dbContext.Games.OrderByDescending(s => s.Id).Take(limit).ToArray();

            return Ok(games);
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

        [HttpGet]
        [Route("game/{gameId}/score")]
        public IActionResult score(string gameId)
        {
            Game game = dbContext.Games.Include(s => s.Hands).Where(s => s.GameId == gameId.ToUpper()).FirstOrDefault();

            if (game != null)
            {
                Dictionary<string, int> scoreValuePairs = new Dictionary<string, int>();
                scoreValuePairs.Add(game.Player1, 0);
                scoreValuePairs.Add(game.Player2, 0);
                scoreValuePairs.Add(game.Player3, 0);
                scoreValuePairs.Add(game.Player4, 0);

                var wins = game.Hands.GroupBy(s => s.Winner).Select(x => new { Winner = x.Key, Total = x.Sum(s => s.Points) });
                var losses = game.Hands.GroupBy(s => s.Loser).Select(x => new { Loser = x.Key, Total = x.Sum(s => s.Points) });

                foreach (var player in scoreValuePairs.Keys.ToList())
                {
                    var win = wins.FirstOrDefault(s => s.Winner == player);
                    var loss = losses.FirstOrDefault(s => s.Loser == player);
                    int totalWin = win != null ? win.Total : 0;
                    int totalLoss = loss != null ? loss.Total : 0;

                    totalLoss = totalLoss + game.Hands.Where(s => s.IsSelfDrawn == true && s.Winner != player).Sum(s => s.Points) / 3;

                    scoreValuePairs[player] = totalWin - totalLoss;
                }

                return Ok(scoreValuePairs.OrderByDescending(s => s.Value));
            }

            return NotFound();
        }

        [HttpPost]
        [Route("game/{gameId}/score/add")]
        public IActionResult addScore(string gameId, [FromBody] Score hand)
        {
            if (hand.GameId == null)
            {
                hand.GameId = gameId;
            }

            hand.GameId = hand.GameId.ToUpper();

            Game game = dbContext.Games.FirstOrDefault(s => s.GameId == hand.GameId);

            PointConversion pointConversion = dbContext.PointConversion.FirstOrDefault(s => s.Fan == hand.Fan);
            hand.Points = pointConversion.Points;

            if (hand.IsSelfDrawn)
            {
                hand.Loser = null;
            }

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
