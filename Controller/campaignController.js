const mailchimp = require('../Config/db')
const getCampaign = async (req, res) => {
    const respose = await mailchimp.campaigns.list();
    return res.send(respose);
};
const createCampaign = async (req, res) => {
    const {
        listId,
        tempalteId,
        subjectLine,
        previewText,
        campaignTitle,
        fromName,
        reply_to,
        to_name,
    } = req.body;
    try {
        const campaign = await mailchimp.campaigns.create({
            type: "regular",
            recipients: {
                // segment_opts: {
                //     saved_segment_id: segmentId,
                //     match: "any",
                // },
                list_id: listId,
            },
            settings: {
                subject_line: subjectLine,
                preview_text: previewText,
                title: campaignTitle,
                template_id: tempalteId,
                from_name: fromName,
                reply_to: reply_to,
                to_name: to_name,
                auto_footer: true,
            },
            content_type: "template",
        });
        res.send(campaign);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
};
const sendCampaign = async (req, res) => {
    const { campaignId } = req.body;
    try {
        await mailchimp.campaigns.send(campaignId);
        res.send("sent succesfully");
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
};
const deleteCampaign = async (req, res) => {
    const { campaignId } = req.body;
    try {
        const response = await client.campaigns.remove(campaignId);
        res.send(response);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}
const CancelCampaign = async (req, res) => {
    const { campaignId } = req.body;
    try {
        const response = await client.campaigns.cancelSend(campaignId);
        res.send(response);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}
const getCampaignFeedback = async (req, res) => {
    const { campaignId } = req.body;
    try {
        const response = await mailchimp.campaigns.getFeedback(campaignId);
        console.log(response);
        res.send(response);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}
const addCampaignFeedback = async (req, res) => {

    const { campaignId } = req.body;
    try {
        const response = await mailchimp.campaigns.addFeedback(campaignId, {
            message: "Feedback for this campaign",
        });
        console.log(response);
        res.send(response);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

module.exports = { getCampaign, createCampaign, sendCampaign, getCampaignFeedback, addCampaignFeedback, deleteCampaign, CancelCampaign }