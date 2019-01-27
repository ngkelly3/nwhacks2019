/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const functions = require('firebase-functions')
const { dialogflow } = require('actions-on-google')

const app = dialogflow()

let monthArray = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  
const bills = [
    {
        'type': 'Phone Bill',
        'amount': 30.00,
        'duedate': new Date('Jan 2, 2019')
    },
    {
        'type': 'Rent' ,
        'amount': 100.00,
        'duedate': new Date('Jan 13, 2019')
        
    },{
        'type': 'Cable Bill',
        'amount': 40.00,
        'duedate': new Date('Jan 24, 2019')
        
    }]

app.intent('bill.dueDate', conv => {
    results = "Here are your bills. ";
    for (let i = 0; i < bills.length; i++) { 
        let datedue = `${monthArray[bills[i].duedate.getMonth()]} ${bills[i].duedate.getDate()}, ${bills[i].duedate.getFullYear()}`
        results += `${bills[i].type} is due on ${datedue}. `
    }
    conv.ask(results)
})

app.intent('Default Fallback Intent', conv => {
  conv.ask(`I didn't understand`)
  conv.ask(`I'm sorry, can you try again?`)
})

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app)