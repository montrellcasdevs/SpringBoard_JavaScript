-- Soccer League schema

DROP DATABASE IF EXISTS soccer_league;
CREATE DATABASE soccer_league;
\c soccer_league

CREATE TABLE leagues (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  season_start DATE,
  season_end DATE
);

CREATE TABLE teams (
  id SERIAL PRIMARY KEY,
  league_id INTEGER REFERENCES leagues(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  city TEXT,
  UNIQUE (league_id, name)
);

CREATE TABLE players (
  id SERIAL PRIMARY KEY,
  team_id INTEGER REFERENCES teams(id) ON DELETE SET NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  position TEXT
+);
+
+CREATE TABLE referees (
+  id SERIAL PRIMARY KEY,
+  first_name TEXT NOT NULL,
+  last_name TEXT NOT NULL
+);
+
+CREATE TABLE matches (
+  id SERIAL PRIMARY KEY,
+  league_id INTEGER REFERENCES leagues(id) ON DELETE CASCADE,
+  home_team_id INTEGER REFERENCES teams(id) ON DELETE SET NULL,
+  away_team_id INTEGER REFERENCES teams(id) ON DELETE SET NULL,
+  match_date TIMESTAMP NOT NULL,
+  home_score INTEGER DEFAULT 0,
+  away_score INTEGER DEFAULT 0
+);
+
+-- many-to-many: referees for a match
+CREATE TABLE match_referees (
+  match_id INTEGER REFERENCES matches(id) ON DELETE CASCADE,
+  referee_id INTEGER REFERENCES referees(id) ON DELETE CASCADE,
+  PRIMARY KEY (match_id, referee_id)
+);
+
+-- goals: who scored, in which match, and minute
+CREATE TABLE goals (
+  id SERIAL PRIMARY KEY,
+  match_id INTEGER REFERENCES matches(id) ON DELETE CASCADE,
+  player_id INTEGER REFERENCES players(id) ON DELETE SET NULL,
+  minute INTEGER,
+  is_own_goal BOOLEAN DEFAULT FALSE
+);
+
+-- standings can be derived; provide a simple table for cached standings if desired
+CREATE TABLE standings (
+  team_id INTEGER PRIMARY KEY REFERENCES teams(id) ON DELETE CASCADE,
+  played INTEGER DEFAULT 0,
+  won INTEGER DEFAULT 0,
+  drawn INTEGER DEFAULT 0,
+  lost INTEGER DEFAULT 0,
+  goals_for INTEGER DEFAULT 0,
+  goals_against INTEGER DEFAULT 0,
+  points INTEGER DEFAULT 0
+);
+
+-- seed sample league, teams, players, referees, matches and goals
+INSERT INTO leagues (name, season_start, season_end) VALUES ('Spring Cup', '2024-08-01', '2025-05-31') ON CONFLICT DO NOTHING;
+
+INSERT INTO teams (league_id, name, city) VALUES
+  ((SELECT id FROM leagues WHERE name='Spring Cup'), 'Red FC', 'Springfield'),
+  ((SELECT id FROM leagues WHERE name='Spring Cup'), 'Blue United', 'Shelbyville')
+ON CONFLICT DO NOTHING;
+
+INSERT INTO players (team_id, first_name, last_name, position) VALUES
+  ((SELECT id FROM teams WHERE name='Red FC'), 'Tom', 'Brown', 'Forward'),
+  ((SELECT id FROM teams WHERE name='Red FC'), 'Evan', 'Stone', 'Midfielder'),
+  ((SELECT id FROM teams WHERE name='Blue United'), 'Liam', 'Smith', 'Forward')
+ON CONFLICT DO NOTHING;
+
+INSERT INTO referees (first_name, last_name) VALUES ('Ref', 'One'), ('Ref', 'Two') ON CONFLICT DO NOTHING;
+
+INSERT INTO matches (league_id, home_team_id, away_team_id, match_date, home_score, away_score) VALUES
+  ((SELECT id FROM leagues WHERE name='Spring Cup'), (SELECT id FROM teams WHERE name='Red FC'), (SELECT id FROM teams WHERE name='Blue United'), '2024-09-10 15:00:00', 2, 1)
+ON CONFLICT DO NOTHING;
+
+INSERT INTO match_referees (match_id, referee_id) VALUES
+  ((SELECT id FROM matches WHERE match_date='2024-09-10 15:00:00'), (SELECT id FROM referees WHERE first_name='Ref' AND last_name='One'))
+ON CONFLICT DO NOTHING;
+
+INSERT INTO goals (match_id, player_id, minute, is_own_goal) VALUES
+  ((SELECT id FROM matches WHERE match_date='2024-09-10 15:00:00'), (SELECT id FROM players WHERE first_name='Tom' AND last_name='Brown'), 12, FALSE),
+  ((SELECT id FROM matches WHERE match_date='2024-09-10 15:00:00'), (SELECT id FROM players WHERE first_name='Liam' AND last_name='Smith'), 30, FALSE),
+  ((SELECT id FROM matches WHERE match_date='2024-09-10 15:00:00'), (SELECT id FROM players WHERE first_name='Tom' AND last_name='Brown'), 78, FALSE)
+ON CONFLICT DO NOTHING;
+
+-- optionally compute standings from matches/goals and populate standings table
+INSERT INTO standings (team_id, played, won, drawn, lost, goals_for, goals_against, points)
+VALUES
+  ((SELECT id FROM teams WHERE name='Red FC'), 1, 1, 0, 0, 2, 1, 3),
+  ((SELECT id FROM teams WHERE name='Blue United'), 1, 0, 0, 1, 1, 2, 0)
+ON CONFLICT DO NOTHING;
