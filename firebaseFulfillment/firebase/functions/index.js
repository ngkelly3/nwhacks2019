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

const functions = require("firebase-functions")
const { dialogflow } = require("actions-on-google")

const app = dialogflow()

let monthArray = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
]

let bills = [
	{
		type: "Phone Bill",
		amount: 30.0,
		duedate: new Date("Jan 12, 2019")
	},
	{
		type: "Rent",
		amount: 100.0,
		duedate: new Date("Jan 4, 2019")
	},
	{
		type: "Cable Bill",
		amount: 40.0,
		duedate: new Date("Jan 24, 2019")
	}
]

app.intent("bill.add", (conv, { billName, billAmount, billDue }) => {
	bills.push({
		type: billName,
		amount: 123,
		duedate: "adsf"
	})
})

app.intent("bill.dueDate", conv => {
	results = "Here are your bills. "
	for (let i = 0; i < bills.length; i++) {
		let datedue = `${monthArray[bills[i].duedate.getMonth()]} ${bills[
			i
		].duedate.getDate()}, ${bills[i].duedate.getFullYear()}`
		results += `${bills[i].type} is due on ${datedue}. `
	}
	conv.ask(results)
})

app.intent("bill.upcoming", conv => {
	let upcoming = 0
	let results = "You have no bills."

	for (let i = 0; i < bills.length; i++) {
		if (i === 0) {
			upcoming = bills[0].duedate.getTime()
			results = `${monthArray[bills[i].duedate.getMonth()]} ${bills[
				i
			].duedate.getDate()}, ${bills[i].duedate.getFullYear()}.`
		} else if (upcoming === bills[i].duedate.getTime()) {
			// console.log(upcoming)
			// console.log(bills[i].duedate.getTime())
			results = `results + ${monthArray[bills[i].duedate.getMonth()]} ${bills[
				i
			].duedate.getDate()}, ${bills[i].duedate.getFullYear()}.`
			// results += `${bills[i].type} is due on ${datedue}. `
		} else if (upcoming > bills[i].duedate.getTime()) {
			upcoming = bills[i].duedate.getTime()
			results = `${monthArray[bills[i].duedate.getMonth()]} ${bills[
				i
			].duedate.getDate()}, ${bills[i].duedate.getFullYear()}.`
		}
	}
	conv.ask(results)
})

app.intent("bill.amount", conv => {
	const totalBills = (accumulator, currentSum) => accumulator + currentSum
	const map1 = bills.map(bill => bill.amount)
	conv.ask(`Your bills total to $${map1.reduce(totalBills)} this month`)
})

app.intent("Default Fallback Intent", conv => {
	conv.ask(`I didn't understand`)
	conv.ask(`I'm sorry, can you try again?`)
})

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app)
