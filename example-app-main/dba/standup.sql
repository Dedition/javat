CREATE TABLE IF NOT EXISTS artist( id INT PRIMARY KEY,
                                                  name TEXT NOT NULL);


CREATE TABLE IF NOT EXISTS genre( id INT PRIMARY KEY,
                                                 name TEXT NOT NULL);


CREATE TABLE IF NOT EXISTS album( id INT PRIMARY KEY,
                                                 name TEXT NOT NULL,
                                                           release_year INT NOT NULL,
                                                                            artist_id INT NOT NULL,
                                                                                          genre_id INT NOT NULL,
                                 FOREIGN KEY(artist_id) REFERENCES artist(id),
                                 FOREIGN KEY(genre_id) REFERENCES genre(id));


INSERT INTO artist (id, name)
VALUES (1,
        'Fleet Foxes'), (2,
                         'Fleetwood Mac'), (3,
                                            'The Beatles'), (4,
                                                             'Nirvana'), (5,
                                                                          'The Notorious B.I.G.');


INSERT INTO genre (id, name)
VALUES (1,
        'Alternative'), (2,
                         'Rock'), (3,
                                   'Hip Hop');


INSERT INTO album (id, name, release_year, artist_id, genre_id)
VALUES (1,
        'Fleet Foxes',
        2008,
        1,
        1), (2,
             'Rumors',
             1977,
             2,
             2), (3,
                  'Abbey Road',
                  1969,
                  3,
                  2), (4,
                       'Nevermind',
                       1991,
                       4,
                       2), (5,
                            'Ready to Die',
                            1994,
                            5,
                            3), (6,
                                 'Revolver',
                                 1966,
                                 3,
                                 2);
