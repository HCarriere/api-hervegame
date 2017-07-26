'use strict';

/**
 * Fill params object with the params of request
 * @param  {Request} req
 * @param  {Object} params
 */
function getParamsFromRequest(req, params) {
	if(!req.body) {
		return;
	}
	for(let key in params) {
		if(params.hasOwnProperty(key)) {
			if(req.body[key]) {
				// set on request
				params[key] = req.body[key];
			}	
		}
	}
}

module.exports = {
    getParamsFromRequest
};