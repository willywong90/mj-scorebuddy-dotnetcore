using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mj_scorekeeper.Classes
{
    public class Utilities
    {
        public static string createGameId()
        {
            Random random = new Random();
            string validCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            string gameId = "";

            for (int i = 0; i < 5; i++)
            {
                gameId = gameId + validCharacters[random.Next(0, validCharacters.Length)];
            }

            return gameId;
        }
    }
}
