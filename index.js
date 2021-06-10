const axios = require('axios');
const cheerio = require('cheerio');
const nodemailer = require("nodemailer");

let url = "https://coap.iitd.ac.in/"

const expectedRound = process.env.EXPECTED_ROUND

const sgMail = require("@sendgrid/mail")

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = (subject,text) => {
  sgMail.send({
    to: process.env.MY_EMAIL,
    from: process.env.MY_NEW_EMAIL,
    subject,
    text
  }).catch((err)=>{
  console.log("error",err.response.body.errors)
})
}


sendEmail("Tracker STart","let's hope this run")

async function getData() {
  try {
    const response = await axios.get(url)
    const $ = cheerio.load(response.data);

    const currentRound  = $("div.col-sm-8.text-left > div.alert.alert-success").length

    console.log("currentRound")

    if(currentRound ==expectedRound){
        console.log("Results Uploaded on COAP. KINDLY CHECK")
        clearInterval(repeat)
        alert("Results Uploaded on COAP. KINDLY CHECK")
        sendEmail("COAP RESULTS UPLOADED",url)
    }
  } catch (error) {
    console.error(error);
  }
}

var repeat = setInterval(getData,30000)