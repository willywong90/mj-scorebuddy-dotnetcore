using System;
using System.Collections.Generic;

namespace mj_scorekeeper
{
    public class Game
    {
        public int Id { get; set; }
        public string GameId { get; set; }
        public DateTime Date { get; set; }

        public string WinnerName { get; set; }

        public string LoserName { get; set; }

        public string Player1 { get; set; }

        public string Player2 { get; set; }

        public string Player3 { get; set; }

        public string Player4 { get; set; }

        public List<Score> Hands { get; set; }

        public Game()
        {
            Date = DateTime.Now;
            Hands = new List<Score>();
        }
    }
}
