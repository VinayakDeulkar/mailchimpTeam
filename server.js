const mailchimp = require("@mailchimp/mailchimp_marketing");
const express = require("express");
const fs = require("fs")
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const templateRoutes = require('./routes/templateRoutes')
const segmentRoutes = require('./routes/segmentRoutes')
const campaignRoutes = require('./routes/campaignRoutes')
// const mailChipmRoutes=require('./routes/mailChipmRoutes')
const audienceRoutes = require('./routes/audienceRoutes')

app.use("/campaign", campaignRoutes)
app.use("/segment", segmentRoutes)
app.use("/template", templateRoutes)
// app.use('/mailChipmRoutes',mailChipmRoutes)
app.use("/audience", audienceRoutes)
app.get("/checkConnectionStatus", async (req, res) => {
    try {
        const response = await mailchimp.ping.get();
        res.send(response);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});
app.listen(4000, () => console.log("server is running on 4000"));
