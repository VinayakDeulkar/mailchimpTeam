const mailchimp = require("@mailchimp/mailchimp_marketing");
const fs = require("fs");
const createAudience = async (req, res) => {
  console.log("agya");
  const {
    from_name,
    from_email,
    subject,
    language,
    company,
    address,
    city,
    state,
    zip,
    country,
    name,
  } = req.body;

  const campaignDefaults = {
    from_name,
    from_email,
    subject,
    language,
  };
  const footerContactInfo = {
    company,
    address1: address,
    city,
    state,
    zip,
    country,
  };

  try {
    const audience = await mailchimp.lists.createList({
      name: name,
      contact: footerContactInfo,
      permission_reminder: "dskfmsdmdsm",
      email_type_option: true,
      campaign_defaults: campaignDefaults,
    });
    res.send(audience.id);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
const addMemeber = async (req, res) => {
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
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
const getList = async (req, res) => {
  const { listId } = req.body;
  try {
    const list = await mailchimp.lists.getList(listId);

    res.send(list);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
const getListMembers = async (req, res) => {
  const { listId } = req.body;
  try {
    const members = await mailchimp.lists.getListMembersInfo(listId);
    let emailList = [];
    members.members.forEach((mem) => emailList.push(mem.email_address));
    res.send(emailList);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
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
    res.sendStatus(400).send(err);
  }
};
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
      html: "<h1>Test Email</h1>",
    });
    res.send(template);
  } catch (err) {
    console.log(err);
    res.sendStatus(400).send(err);
  }
};
// const createTemplate = async (req, res) => {
//   const { templateName } = req.body;
//   const createTemp = async (err, htmlTemplate) => {
//     if (err) {
//       console.log(err);
//       res.send("An error occured while reading template html file!");
//     }
//     try {
//       const template = await mailchimp.templates.create({
//         name: templateName,
//         html: htmlTemplate,
//       });
//       console.log(template);
//       res.send(template);
//     } catch (err) {
//       res.status(400);
//     }
//   };
//   /* Read the html document as utf8*/
//   fs.readFile("../Controllers/testtemplate.html", createTemp);
// };
const getCampaign = async (req, res) => {
  const respose = await mailchimp.campaigns.list();
  res.send(respose);
};
const createCampaign = async (req, res) => {
  const {
    segmentId,
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
        segment_opts: {
          saved_segment_id: segmentId,
          match: "any",
        },
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
module.exports = {
  createAudience,
  addMemeber,
  getList,
  getListMembers,
  getSegment,
  createSegment,
  getTemplate,
  createTemplate,
  getCampaign,
  createCampaign,
  sendCampaign,
};
