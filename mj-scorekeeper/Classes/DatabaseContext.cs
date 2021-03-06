﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mj_scorekeeper.Classes
{
    public class DatabaseContext : DbContext
    {
        public DbSet<PointConversion> PointConversion { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<Score> Hands { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Filename=data.db");
        }

        public void addScoringValues()
        {
            PointConversion.Add(new PointConversion { Fan = 3, Points = 32, PointsSelfDrawn = 16});
            PointConversion.Add(new PointConversion { Fan = 4, Points = 64, PointsSelfDrawn = 32 });
            PointConversion.Add(new PointConversion { Fan = 5, Points = 96, PointsSelfDrawn = 48 });
            PointConversion.Add(new PointConversion { Fan = 6, Points = 128, PointsSelfDrawn = 64 });
            PointConversion.Add(new PointConversion { Fan = 7, Points = 192, PointsSelfDrawn = 96 });
            PointConversion.Add(new PointConversion { Fan = 8, Points = 256, PointsSelfDrawn = 128 });
        }
    }
}
