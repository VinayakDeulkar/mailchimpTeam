const mailchimp = require('../Config/db')
const GET_ADUIENCE = async (req, res) => {
    try {
        const response = await mailchimp.lists.getAllLists();
        return res.status(200).json(response)
    }
    catch {
        return res.status(200).json({ status: 401, msg: 'unable to find audience' })
    }
}

const ADD_MEMBER = async (req, res) => {
    const { listId, firstname, lastname, email, tag } = req.body;
    try {
        const response = await mailchimp.lists.addListMember(listId, {
            email_address: email,
            status: "subscribed",
            email_type: "html",
            merge_fields: {
                FNAME: firstname,
                LNAME: lastname,
            },
            tags: [tag],
        });
        return res.send(response);
    } catch (err) {
        return res.status(400).send(err);
    }
}

const GET_MEMBER = async (req, res) => {
    const { listId } = req.body
    try {
        const response = await mailchimp.lists.getListMembersInfo(listId,{
            /* fields:["members.email_address"], */
            count:1000
        });
        console.log(response.members.map(ele => ele.id).length);
        return res.send(response);
    }
    catch {
        return res.status(200).json({ status: 401, msg: 'unable to find members' })
    }
}

const DELETE_MEMBER = async (req, res) => {
    const { listId, subscriber_hash } = req.body
    try {
        const response = await mailchimp.lists.deleteListMember(
            listId,
            subscriber_hash
        );
        return res.send("Successful");
    }
    catch {
        return res.status(200).json({ status: 401, msg: 'unable to find members' })
    }
}
const DELETE_ADUIENCE = async (req, res) => {
    try {
        const response = await client.lists.deleteList(req.body);
        return res.status(200).json(response)
    }
    catch {
        return res.status(200).json({ status: 401, msg: 'unable to find audience' })
    }
}
const CREATE_AUDIENCE = async (req, res) => {
    const {
        name,
        company,
        address1,
        city,
        state,
        zip,
        country,
        from_name,
        from_email,
        subject,
        language,
    } = req.body;
    const footerContactInfo = {
        company,
        address1,
        city,
        state,
        zip,
        country,
    };
    const campaignDefaults = { from_name, from_email, subject, language };
    try {
        const audience = await mailchimp.lists.createList({
            name: name,
            contact: footerContactInfo,
            permission_reminder:
                "You are receiving this email because you opted in via our website.",
            email_type_option: true,
            campaign_defaults: campaignDefaults,
        });
        return res.send(audience.id);
    } catch (err) {
        return res.status(400).send(err);
    }
}
const GET_GROETHHISTORY = async (req, res) => {
    const { list_id } = req.body;
    try {
        const response = await mailchimp.lists.getListGrowthHistory(list_id);
        return res.send(response);
    } catch (err) {
        console.log(err);
    }
}
const GET_LOCATION = async (req, res) => {
    const { list_id } = req.body;
    try {
        const response = await mailchimp.lists.getListLocations(list_id);
        console.log(response);
        return res.send(response);
    } catch (err) {
        console.log(err);
    }
}
module.exports = { GET_ADUIENCE, CREATE_AUDIENCE, ADD_MEMBER, GET_MEMBER, DELETE_ADUIENCE, DELETE_MEMBER, GET_GROETHHISTORY, GET_LOCATION }