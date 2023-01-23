const Exercise = require('../../models/Exercise');

exports.list = async (req, res ) => {
    const searchQuery = req.query.search;

    if (!searchQuery) {
        res.json([]);
    }

    try{
        const Result = await Exercise.find(
            {$text: {$search: searchQuery}},
        )
        res.json(Result);
    } catch(error){
        console.log(error);
        res.status(404).send({
            message: `could not perform search`
        });
    }
}