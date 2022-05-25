const mailchimp = require('../Config/db')

const getTemplate = async (req, res) => {
    try {
        const response = await mailchimp.templates.list();
        res.send(response);
    } catch (err) {
        console.log(err);
        res.sendStatus(400).send(err);
    }
};

const createTemplate = async (req, res) => {
    const { templateName } = req.body;
    try {
        const template = await mailchimp.templates.create({
            name: templateName,
            html: "<center><h1>Dabadu</h1><h1>Your Business Process Reinvented</h1><h3>Accelerating technology disruption in the automotive market</h3></center>",
        });
        res.send(template);
    } catch (err) {
        console.log(err);
        res.sendStatus(400).send(err);
    }
};
module.exports = { getTemplate, createTemplate }