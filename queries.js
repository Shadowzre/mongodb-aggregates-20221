db.movies.aggregate({$sort:{'awards.wins':-1}},
{$limit: 5})

db.movies.aggregate(
    {
    $match:{
    "type": "movie"
    }
    },
    {
    $group: {
    _id: "$year",
    numberOfFilms: { $sum: 1 },
    avgRating: { $avg: "$imdb.rating" }
    }
    },
    {
    $project: {
    _id: 0,
    year: "S_id",
    numberOfFilms: 1,
    avgRating: 1,
    }
    }
    );
    
    db.movies.aggregate(
        { $unwind: "$languages" },
        {
        $group: {
        _id: "$languages",
        numberOfFilms: { $sum: 1},
        }
        }
        );

        db.movies.aggregate(
            {$match: { title: "Secret Agent" } },
            { $unwind: "$languages" },
            { $project: { title: 1, language: "$languages"
            } }
            );