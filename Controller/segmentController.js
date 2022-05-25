const mailchimp = require('../Config/db')

const getSegment = async (req, res) => {
    const { listId } = req.body;
    try {
        const response = await mailchimp.lists.listSegments(listId);
        res.send(response);
    } catch (err) {
        console.log(err);
        res.sendStatus(400).send(err);
    }
};
const createSegment = async (req, res) => {
    const { listId, segmentName, emailList } = req.body;
    console.log(req.body);
    const conditions = [];
    emailList.forEach((email) => {
        conditions.push({
            field: "EMAIL",
            op: "contains",
            value: email, // email address
        });
    });
    try {
        const segment = await mailchimp.lists.createSegment(listId, {
            name: segmentName,
            options: {
                match: "any",
                conditions: conditions,
            },
        });
        res.send(segment);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
};
module.exports = { getSegment, createSegment }