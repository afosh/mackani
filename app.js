const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const PORT = process.env.PORT || 3000 ;
const app = express();
const helper = require('./helper');
var cors = require('cors')

const accountSid = 'AC311788f6a79fca594ffeb71f2f50911b'; 
const authToken = '8653f40ae8d69caf3bb8f23a636c2398'; 
const client = require('twilio')(accountSid, authToken); 
 


app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const barbers = [
    {id:1, value:"Anwar"},
    {id:2, value:"Amjad"},
    {id:3, value:"Rabah"},
    {id:4, value:"Kamal"},
    {id:5, value:"Jamal"},
  
  ];
  const time = [
      '8 am',
      '9 am',
      '10 am',
      '11 am',
      '12 am',
      '1 pm',
      '2 pm',
      '3 pm',
      '4 pm',
      '5 pm',
      '6 pm',
      '7 pm',
      '8 pm',
      '9 pm',
      '10 pm',
      '11 pm',
      '10 pm',
    ]

   const RESERVATIONS = [
        { id: 0, value: "الباقه الفضيه", price: "150 SR" },
        { id: 1, value: "الباقه الذهبيه", price: "250 SR" },
        { id: 2, value: "الباقه الماسيه", price: "400 SR" },
        { id: 3, value: "حلاقة الشعر", price: "35 SR" },
        { id: 4, value: "حلاقة الذقن", price: "25 SR" },
        { id: 5, value: "استشوار مع غسيل شعر", price: "50 SR" },
        { id: 6, value: "انواع الماسك", price: "50 SR" },
        { id: 7, value: "شمع", price: "50 SR" },
        { id: 8, value: "حمام زيت شعر", price: "120 SR" },
        { id: 9, value: "صبغة شعر", price: "120 SR" },
        { id: 10, value: "صبغة دقن", price: "60 SR" },
        { id: 11, value: "كراتين", price: "300 SR" },
        { id: 12, value: "حناء شعر", price: "100 SR" },
        { id: 13, value: "تنظيف بشره", price: "250 SR" },
        { id: 14, value: "تجهيز عرسان", price: "800 SR" },
        { id: 15, value: "منكير بدكير", price: "150 SR" },
      ];

const engVersionReservations = [
    { id: 0, value: "Silver Package", price: "150 SR" },
        { id: 1, value: "Golden Package", price: "250 SR" },
        { id: 2, value: "Diamond Package", price: "400 SR" },
        { id: 3, value: "Haircut", price: "35 SR" },
        { id: 4, value: "BeardCut", price: "25 SR" },
        { id: 5, value: "hair", price: "50 SR" },
        { id: 6, value: "انواع الماسك", price: "50 SR" },
        { id: 7, value: "شمع", price: "50 SR" },
        { id: 8, value: "حمام زيت شعر", price: "120 SR" },
        { id: 9, value: "صبغة شعر", price: "120 SR" },
        { id: 10, value: "صبغة دقن", price: "60 SR" },
        { id: 11, value: "كراتين", price: "300 SR" },
        { id: 12, value: "حناء شعر", price: "100 SR" },
        { id: 13, value: "تنظيف بشره", price: "250 SR" },
        { id: 14, value: "تجهيز عرسان", price: "800 SR" },
        { id: 15, value: "منكير بدكير", price: "150 SR" },
]
console.log(barbers)
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.get('/', (req, res)=>{
    res.render('index',{barbers, time, RESERVATIONS});
})


function getType(id){

    return RESERVATIONS[id].value;
}
app.post('/api', (req, res)=>{

    const {name, date, barber, time,Reservations, phone} = req.body;
   
    var arr = RESERVATIONS[Reservations].value;

    client.messages 
      .create({ 
         body:`name: ${name} date: ${date} barber: ${barber} time: ${time} Services: ${arr} phone: ${phone}`, 
         from: 'whatsapp:+14155238886',       
         to: 'whatsapp:+966566438824' 
       }) 
      .then(message => console.log(message.sid)) 
      .done();
    console.log(arr);
    res.send('welcome to /api')
})

app.listen(PORT, ()=> console.log(`server is up on port ${PORT}`));
