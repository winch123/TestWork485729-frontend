import axios from "axios"
//import { createStore } from 'redux'
//import mainReduser from './reducers'
//import React from 'react'
//import { notification } from 'antd'
//import { CheckCircleOutlined, InfoCircleOutlined, WarningOutlined } from '@ant-design/icons'

//import { createBrowserHistory } from 'history'
//const history = createBrowserHistory()
//export {history}

//const store = createStore(mainReduser, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
//export {store}

//export function dispatch(type, value) {
//	store.dispatch({type, value})
//}
const SERVER_URL = 'http://127.0.0.1:8000/'
const API_URL = SERVER_URL + 'api/'

let api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    responseType: "json"
});

const apiRequest = function(url, params={}, config={}) {
    return new Promise(function(resolve, reject) {
		let fmData = new FormData()
		for (const k in params) {
			let element = params[k]
			if (Array.isArray(element)) {
				for (let i = 0; i < element.length; i++) {
					fmData.append(k+'[]', element[i])
				}
			}
			else if (typeof element !== 'undefined') {
				fmData.append(k, element)
			}
		}
		axios({
			method: 'post',
			//url: process.env.REACT_APP_API_URL + url,
            url: API_URL + url,

			params: {salonId: localStorage.getItem('currentSalonId')},
			data: fmData,
			headers: {
				Accept: 'application/json',
                // Authorization: 'Bearer ' + localStorage.getItem("token") || null,
			},
			config,
		})
        .then(res => {
			const data = res.data || {}
			/*
            if (data.actions) {
                for (let action of data.actions ) {
                    store.dispatch({type: action.type, value: action.value})
                }
            }
            if (data.redirect) {
                apiRequest(data.redirect.url, data.redirect.params || null)
            }
			if (data.message) {
				notification.open({
					message: data.message.title,
					description: data.message.text,
					onClick: () => {
					console.log('Notification Clicked!')
					},
					duration: 4,
					icon: {
						info: <InfoCircleOutlined style={{ color: '#108ee9' }} />,
						ok: <CheckCircleOutlined style={{ color: 'green' }} />,
						warning: <WarningOutlined style={{ color: 'red' }} />,
					}[data.message.iconType],
					style: {backgroundColor: 'Cornsilk'},
				})
			} */

            resolve(data)
        })
		.catch(error => {
			// console.log('error', url, error)
			if (error.response && [401,404,422].indexOf(error.response.status) > -1) {
				//history.push('/login')
				reject(error.response)
			}
			reject(error)
		})
    })
}

export {api, apiRequest, SERVER_URL}
