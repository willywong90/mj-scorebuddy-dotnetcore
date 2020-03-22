using System;

namespace mj_scorekeeper
{
    public class Score
    {
        public int Id { get; set; }

        public DateTime Date { get; set; }

        public string GameId { get; set; }

        public string Winner { get; set; }

        public string Loser { get; set; }

        public int Fan { get; set; }

        public int Points { get; set; }

        public bool IsSelfDrawn { get; set; }

        public Score()
        {
            Date = DateTime.Now;
            Fan = 3;
            IsSelfDrawn = false;
        }
    }
}
